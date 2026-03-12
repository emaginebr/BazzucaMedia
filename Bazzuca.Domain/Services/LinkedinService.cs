using Bazzuca.Domain.Interface.Factory;
using Bazzuca.Domain.Interface.Services;
using Bazzuca.DTO.Post;
using Bazzuca.DTO.Queue;
using Bazzuca.Infra.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Bazzuca.Domain.Interface
{
    public class LinkedinService : ILinkedinService
    {
        private readonly ILinkedinAppService _linkedinAppService;
        private readonly IS3Service _s3Service;
        private readonly IRabbitAppService _rabbitAppService;
        private readonly IPostService _postService;
        private readonly ISocialNetworkService _networkService;
        private readonly IConfiguration _configuration;
        private readonly IPostDomainFactory _postFactory;
        private readonly ISocialNetworkDomainFactory _networkFactory;
        private readonly ILogger<LinkedinService> _logger;

        public LinkedinService(
            ILinkedinAppService linkedinAppService,
            IS3Service s3Service,
            IRabbitAppService rabbitAppService,
            IPostService postService,
            ISocialNetworkService networkService,
            IConfiguration configuration,
            IPostDomainFactory postFactory,
            ISocialNetworkDomainFactory networkFactory,
            ILogger<LinkedinService> logger)
        {
            _linkedinAppService = linkedinAppService;
            _s3Service = s3Service;
            _rabbitAppService = rabbitAppService;
            _postService = postService;
            _networkService = networkService;
            _configuration = configuration;
            _postFactory = postFactory;
            _networkFactory = networkFactory;
            _logger = logger;
        }

        public async Task Process(PublishMessage message, IDictionary<string, object> headers)
        {
            var post = _postService.GetById(message.PostId);
            if (post == null)
            {
                _logger.LogError("Post {PostId} not found", message.PostId);
                return;
            }

            var network = _networkService.GetById(message.NetworkId);
            if (network == null)
            {
                _logger.LogError("SocialNetwork {NetworkId} not found", message.NetworkId);
                return;
            }

            string tempMediaPath = null;

            try
            {
                // Download media from S3 if exists
                if (!string.IsNullOrEmpty(post.MediaUrl))
                {
                    var mediaBytes = await _s3Service.DownloadFile(post.MediaUrl);
                    if (mediaBytes != null && mediaBytes.Length > 0)
                    {
                        var extension = Path.GetExtension(post.MediaUrl) ?? ".jpg";
                        tempMediaPath = Path.Combine(Path.GetTempPath(), $"linkedin-{post.PostId}{extension}");
                        await File.WriteAllBytesAsync(tempMediaPath, mediaBytes);
                    }
                }

                // Publish via Playwright
                await _linkedinAppService.PublishPost(
                    network.User,
                    network.Password,
                    message.ClientId,
                    post.Title,
                    post.Description,
                    tempMediaPath);

                // Success — update status
                post.Status = PostStatusEnum.Posted;
                post.Update(_postFactory);
                _logger.LogInformation("LinkedIn post {PostId} published successfully", message.PostId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error publishing LinkedIn post {PostId}", message.PostId);
                HandleRetry(message, headers, ex);
                throw;
            }
            finally
            {
                // Cleanup temp file
                if (tempMediaPath != null && File.Exists(tempMediaPath))
                {
                    try { File.Delete(tempMediaPath); } catch { }
                }
            }
        }

        private void HandleRetry(PublishMessage message, IDictionary<string, object> headers, Exception ex)
        {
            var retryCount = 0;
            if (headers.ContainsKey("x-retry-count"))
            {
                var value = headers["x-retry-count"];
                retryCount = value is int i ? i : Convert.ToInt32(value);
            }
            retryCount++;

            var queueSettings = _configuration.GetSection("Queues:LinkedIn").Get<QueueSettings>();
            var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));
            var newHeaders = new Dictionary<string, object>(headers)
            {
                ["x-retry-count"] = retryCount
            };

            if (retryCount < queueSettings.MaxRetryCount)
            {
                _logger.LogWarning("Retrying LinkedIn post {PostId} (attempt {Attempt}/{Max})",
                    message.PostId, retryCount, queueSettings.MaxRetryCount);
                _rabbitAppService.PublishToRetry("bazzuca.linkedin.retry.exchange", body, newHeaders);
            }
            else
            {
                _logger.LogError("LinkedIn post {PostId} sent to DLQ after {Max} retries. Error: {Error}",
                    message.PostId, queueSettings.MaxRetryCount, ex.Message);
                _rabbitAppService.PublishToError("bazzuca.linkedin.error.exchange", body, newHeaders);
            }
        }
    }
}
