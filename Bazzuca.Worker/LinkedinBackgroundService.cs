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
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Bazzuca.Worker
{
    public class LinkedinBackgroundService : BackgroundService
    {
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
            _rabbitAppService.DeclareTopology("bazzuca.linkedin", queueSettings);

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
                var message = JsonConvert.DeserializeObject<PublishMessage>(messageJson);
                if (message == null)
                {
                    _logger.LogError("Failed to deserialize PublishMessage");
                    return;
                }

                _logger.LogInformation("Processing LinkedIn post {PostId} for tenant {TenantId}",
                    message.PostId, tenantId);

                using var scope = _serviceProvider.CreateScope();

                // Create tenant-specific DbContext
                var dbContextFactory = scope.ServiceProvider.GetRequiredService<ITenantDbContextFactory>();
                var dbContext = dbContextFactory.CreateForTenant(tenantId);

                // Replace the scoped BazzucaContext with tenant-specific one
                // We need to use the scope's service provider to resolve services that depend on BazzucaContext
                // Since BazzucaContext is registered differently in Worker mode (via DbContextFactory with default tenant),
                // we create a new scope with the correct context
                var linkedinService = scope.ServiceProvider.GetRequiredService<ILinkedinService>();

                try
                {
                    await linkedinService.Process(message, headers);
                    _logger.LogInformation("LinkedIn post {PostId} processed successfully", message.PostId);
                }
                catch (Exception ex)
                {
                    // Retry/DLQ already handled inside LinkedinService.Process
                    _logger.LogError(ex, "LinkedIn post {PostId} processing failed (retry/DLQ handled by domain)",
                        message.PostId);
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
