using Bazzuca.Application.Interfaces;
using Bazzuca.Domain.Interface.Services;
using Bazzuca.DTO.Post;
using Bazzuca.DTO.Queue;
using Bazzuca.Infra.Context;
using Bazzuca.Infra.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Prometheus;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Bazzuca.Worker
{
    public class LinkedinBackgroundService : BackgroundService
    {
        private static readonly Counter LinkedinMessagesProcessed = Metrics.CreateCounter(
            "linkedin_messages_processed_total",
            "Total LinkedIn messages processed",
            new CounterConfiguration { LabelNames = new[] { "status", "tenant" } });

        private static readonly Histogram LinkedinProcessingDuration = Metrics.CreateHistogram(
            "linkedin_processing_duration_seconds",
            "Duration of LinkedIn post processing",
            new HistogramConfiguration
            {
                LabelNames = new[] { "tenant" },
                Buckets = Histogram.ExponentialBuckets(1, 2, 8) // 1s, 2s, 4s ... 128s
            });

        private static readonly Gauge LinkedinMessagesInProgress = Metrics.CreateGauge(
            "linkedin_messages_in_progress",
            "LinkedIn messages currently being processed");

        private readonly IRabbitAppService _rabbitAppService;
        private readonly IServiceProvider _serviceProvider;
        private readonly IConfiguration _configuration;
        private readonly ILogger<LinkedinBackgroundService> _logger;

        public LinkedinBackgroundService(
            IRabbitAppService rabbitAppService,
            IServiceProvider serviceProvider,
            IConfiguration configuration,
            ILogger<LinkedinBackgroundService> logger)
        {
            _rabbitAppService = rabbitAppService;
            _serviceProvider = serviceProvider;
            _configuration = configuration;
            _logger = logger;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var queueSettings = _configuration.GetSection("Queues:LinkedIn").Get<QueueSettings>();
            if (queueSettings == null)
            {
                _logger.LogWarning("Queues:LinkedIn configuration not found. LinkedIn consumer not started.");
                return Task.CompletedTask;
            }

            // Declare topology
            _rabbitAppService.DeclareTopology(queueSettings);

            // Start consuming
            _rabbitAppService.StartConsuming(queueSettings.Msg, async (body, headers) =>
            {
                var tenantId = ExtractTenantId(headers);
                if (string.IsNullOrEmpty(tenantId))
                {
                    _logger.LogError("X-Tenant-Id header not found in message");
                    return;
                }

                var messageJson = Encoding.UTF8.GetString(body);
                var postInfo = JsonConvert.DeserializeObject<PostInfo>(messageJson);
                if (postInfo == null)
                {
                    _logger.LogError("Failed to deserialize PostInfo");
                    return;
                }

                _logger.LogInformation("Processing LinkedIn post {PostId} for tenant {TenantId}",
                    postInfo.PostId, tenantId);

                LinkedinMessagesInProgress.Inc();
                var stopwatch = Stopwatch.StartNew();

                using var scope = _serviceProvider.CreateScope();

                // Create tenant-specific DbContext
                var dbContextFactory = scope.ServiceProvider.GetRequiredService<ITenantDbContextFactory>();
                var dbContext = dbContextFactory.CreateForTenant(tenantId);

                var linkedinService = scope.ServiceProvider.GetRequiredService<ILinkedinService>();

                try
                {
                    await linkedinService.Process(postInfo, headers);
                    _logger.LogInformation("LinkedIn post {PostId} processed successfully", postInfo.PostId);
                    LinkedinMessagesProcessed.WithLabels("success", tenantId).Inc();
                }
                catch (Exception ex)
                {
                    // Retry/DLQ already handled inside LinkedinService.Process
                    _logger.LogError(ex, "LinkedIn post {PostId} processing failed (retry/DLQ handled by domain)",
                        postInfo.PostId);
                    LinkedinMessagesProcessed.WithLabels("failure", tenantId).Inc();
                }
                finally
                {
                    stopwatch.Stop();
                    LinkedinProcessingDuration.WithLabels(tenantId).Observe(stopwatch.Elapsed.TotalSeconds);
                    LinkedinMessagesInProgress.Dec();
                }
            });

            _logger.LogInformation("LinkedIn consumer started on queue {Queue}", queueSettings.Msg);
            return Task.CompletedTask;
        }

        private string ExtractTenantId(IDictionary<string, object> headers)
        {
            if (headers == null || !headers.ContainsKey("X-Tenant-Id"))
                return null;

            var value = headers["X-Tenant-Id"];
            if (value is byte[] bytes)
                return Encoding.UTF8.GetString(bytes);

            return value?.ToString();
        }
    }
}
