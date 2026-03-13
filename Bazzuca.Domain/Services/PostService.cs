using Bazzuca.DTO.Post;
using Bazzuca.DTO.Queue;
using Bazzuca.DTO.SocialNetwork;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bazzuca.Infra.Interface;
using Bazzuca.Domain.Interface.Factory;
using Bazzuca.Domain.Interface.Models;
using Bazzuca.Domain.Interface.Services;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Bazzuca.Domain.Interface
{
    public class PostService : IPostService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPostDomainFactory _postFactory;
        private readonly IClientDomainFactory _clientFactory;
        private readonly ISocialNetworkDomainFactory _networkFactory;
        private readonly IClientService _clientService;
        private readonly ISocialNetworkService _networkService;
        private readonly IS3Service _s3Service;
        private readonly IRabbitAppService _rabbitAppService;
        private readonly ILinkedinAppService _linkedinAppService;
        private readonly IConfiguration _configuration;

        public PostService(
            IUnitOfWork unitOfWork,
            IPostDomainFactory postFactory,
            IClientDomainFactory clientFactory,
            ISocialNetworkDomainFactory networkFactory,
            IClientService clientService,
            ISocialNetworkService networkService,
            IS3Service s3Service,
            IRabbitAppService rabbitAppService,
            ILinkedinAppService linkedinAppService,
            IConfiguration configuration
        )
        {
            _unitOfWork = unitOfWork;
            _postFactory = postFactory;
            _clientFactory = clientFactory;
            _networkFactory = networkFactory;
            _clientService = clientService;
            _networkService = networkService;
            _s3Service = s3Service;
            _rabbitAppService = rabbitAppService;
            _linkedinAppService = linkedinAppService;
            _configuration = configuration;
        }

        private static (DateTime Start, DateTime End) GetExtendedMonthRange(int month, int year)
        {
            // Primeiro dia do m�s
            var firstOfMonth = new DateTime(year, month, 1);

            // �ltimo dia do m�s
            var lastOfMonth = firstOfMonth.AddMonths(1).AddDays(-1);

            // Buscar o s�bado antes ou igual ao primeiro dia
            var start = firstOfMonth;
            while (start.DayOfWeek != DayOfWeek.Saturday)
                start = start.AddDays(-1);

            // Buscar o domingo depois ou igual ao �ltimo dia
            var end = lastOfMonth;
            while (end.DayOfWeek != DayOfWeek.Sunday)
                end = end.AddDays(1);

            return (start.Date, end.Date);
        }

        public IEnumerable<IPostModel> ListByUser(long userId, int month, int year)
        {
            var (start, end) = GetExtendedMonthRange(month, year);

            return _postFactory.BuildPostModel().ListByUser(userId, start, end, _postFactory);
        }

        public IPostModel GetById(long postId)
        {
            return _postFactory.BuildPostModel().GetById(postId, _postFactory);
        }
        public PostInfo GetPostInfo(IPostModel model)
        {
            if (model == null)
            {
                return null;
            }
            return new PostInfo
            {
                PostId = model.PostId,
                ClientId = model.ClientId,
                NetworkId = model.NetworkId,
                PostType = model.PostType,
                MediaUrl = model.MediaUrl,
                ScheduleDate = model.ScheduleDate,
                Title = model.Title,
                Description = model.Description,
                Status = model.Status,
                Client = _clientService.GetClientInfo(model.GetClient(_clientFactory)),
                SocialNetwork = _networkService.GetNetworkInfo(model.GetSocialNetwork(_networkFactory))
            };
        }

        private DateTime RoundToNearest30Minutes(DateTime input)
        {
            var totalMinutes = input.TimeOfDay.TotalMinutes;
            var roundedMinutes = Math.Floor(totalMinutes / 30.0) * 30;

            return input.Date.AddMinutes(roundedMinutes);
        }

        private void ValidateScheduleDate(IPostModel post)
        {
            var scheduleDate = DateTime.SpecifyKind(post.ScheduleDate, DateTimeKind.Unspecified);
            scheduleDate = RoundToNearest30Minutes(scheduleDate);

            var client = _clientFactory.BuildClientModel().GetById(post.ClientId, _clientFactory);

            var modelTime = post.GetByScheduleDate(client.UserId, scheduleDate, _postFactory);
            while (modelTime != null)
            {
                scheduleDate = scheduleDate.AddMinutes(30);
                modelTime = post.GetByScheduleDate(client.UserId, scheduleDate, _postFactory);
            }
            post.ScheduleDate = scheduleDate;
        }

        public IPostModel Insert(PostInfo post)
        {
            if (post == null)
            {
                throw new ArgumentException("Post n�o informado");
            }
            var model = _postFactory.BuildPostModel();

            model.PostId = post.PostId;
            model.ClientId = post.ClientId;
            model.NetworkId = post.NetworkId;
            model.PostType = post.PostType;
            model.MediaUrl = post.MediaUrl;
            model.ScheduleDate = post.ScheduleDate;
            model.Title = post.Title;
            model.Description = post.Description;
            model.Status = post.Status;

            ValidateScheduleDate(model);

            return model.Insert(_postFactory);
        }

        public IPostModel Update(PostInfo post)
        {
            if (post == null)
            {
                throw new ArgumentException("Post n�o informado");
            }
            var model = _postFactory.BuildPostModel().GetById(post.PostId, _postFactory);

            model.ClientId = post.ClientId;
            model.NetworkId = post.NetworkId;
            model.PostType = post.PostType;
            model.MediaUrl = post.MediaUrl;
            model.ScheduleDate = post.ScheduleDate;
            model.Title = post.Title;
            model.Description = post.Description;
            model.Status = post.Status;

            ValidateScheduleDate(model);

            return model.Update(_postFactory);
        }

        public PostListPaged Search(PostSearchParam param)
        {

            var model = _postFactory.BuildPostModel();
            int pageCount = 0;
            var posts = model.Search(
                param.UserId,
                param.ClientId,
                param.Network,
                param.Status,
                param.PageNum,
                out pageCount,
                _postFactory
             )
             .Select(x => GetPostInfo(x))
             .ToList();
            return new PostListPaged
            {
                Posts = posts,
                PageNum = param.PageNum,
                PageCount = pageCount
            };
        }

        private IPostModel EnsureAndInsert(PostInfo postInfo, long userId)
        {
            // Ensure client exists — find by name+userId or by ID, create only if not found
            if (postInfo.ClientId == 0 && postInfo.Client != null)
            {
                var existingClient = _clientService.ListByUser(userId)
                    .FirstOrDefault(c => c.Name == postInfo.Client.Name);

                if (existingClient != null)
                {
                    postInfo.ClientId = existingClient.ClientId;
                }
                else
                {
                    postInfo.Client.UserId = userId;
                    var client = _clientService.Insert(postInfo.Client);
                    postInfo.ClientId = client.ClientId;
                }
            }
            else if (postInfo.ClientId > 0)
            {
                var existingClient = _clientService.GetById(postInfo.ClientId);
                if (existingClient == null && postInfo.Client != null)
                {
                    postInfo.Client.UserId = userId;
                    var client = _clientService.Insert(postInfo.Client);
                    postInfo.ClientId = client.ClientId;
                }
            }

            // Ensure social network exists — find by clientId+network type, create only if not found
            if (postInfo.NetworkId == 0 && postInfo.SocialNetwork != null)
            {
                var existingNetwork = _networkService.ListByClient(postInfo.ClientId)
                    .FirstOrDefault(n => n.Network == postInfo.SocialNetwork.Network);

                if (existingNetwork != null)
                {
                    postInfo.NetworkId = existingNetwork.NetworkId;
                }
                else
                {
                    postInfo.SocialNetwork.ClientId = postInfo.ClientId;
                    var network = _networkService.Insert(postInfo.SocialNetwork);
                    postInfo.NetworkId = network.NetworkId;
                }
            }
            else if (postInfo.NetworkId > 0)
            {
                var existingNetwork = _networkService.GetById(postInfo.NetworkId);
                if (existingNetwork == null && postInfo.SocialNetwork != null)
                {
                    postInfo.SocialNetwork.ClientId = postInfo.ClientId;
                    var network = _networkService.Insert(postInfo.SocialNetwork);
                    postInfo.NetworkId = network.NetworkId;
                }
            }

            // Create post with current date and status Queued
            postInfo.ScheduleDate = DateTime.UtcNow;
            postInfo.Status = PostStatusEnum.Queued;
            return Insert(postInfo);
        }

        public PostInfo Publish(PostInfo postInfo, long userId, string tenantId)
        {
            var post = EnsureAndInsert(postInfo, userId);
            postInfo.PostId = post.PostId;

            // Publish PostInfo to queue
            var queueSettings = _configuration.GetSection("Queues:LinkedIn").Get<QueueSettings>();
            var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(postInfo));
            var headers = new Dictionary<string, object>
            {
                { "X-Tenant-Id", tenantId },
                { "x-retry-count", 0 }
            };
            _rabbitAppService.Publish(queueSettings.Exchange, body, headers);

            return GetPostInfo(post);
        }

        public async Task<PostInfo> PublishDirect(PostInfo postInfo, long userId, bool headless = true)
        {
            var postModel = EnsureAndInsert(postInfo, userId);
            postInfo.PostId = postModel.PostId;

            var network = _networkService.GetById(postInfo.NetworkId);

            string tempMediaPath = null;
            try
            {
                if (!string.IsNullOrEmpty(postModel.MediaUrl))
                {
                    var mediaBytes = await _s3Service.DownloadFile(postModel.MediaUrl);
                    if (mediaBytes != null && mediaBytes.Length > 0)
                    {
                        var extension = Path.GetExtension(postModel.MediaUrl) ?? ".jpg";
                        tempMediaPath = Path.Combine(Path.GetTempPath(), $"linkedin-{postModel.PostId}{extension}");
                        await File.WriteAllBytesAsync(tempMediaPath, mediaBytes);
                    }
                }

                await _linkedinAppService.PublishPost(
                    network.User,
                    network.Password,
                    postInfo.ClientId,
                    postModel.Title,
                    postModel.Description,
                    tempMediaPath,
                    headless);

                postModel.Status = PostStatusEnum.Posted;
                postModel.Update(_postFactory);
            }
            finally
            {
                if (tempMediaPath != null && File.Exists(tempMediaPath))
                {
                    try { File.Delete(tempMediaPath); } catch { }
                }
            }

            return GetPostInfo(postModel);
        }

        public IPostModel MarkAsPublished(long postId)
        {
            var post = GetById(postId);
            if (post == null)
            {
                throw new ArgumentException("Post não encontrado");
            }
            post.Status = PostStatusEnum.Posted;
            return post.Update(_postFactory);
        }
    }
}