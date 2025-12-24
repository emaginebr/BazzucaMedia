using BazzucaMedia.DTO.Post;
using BazzucaMedia.DTO.SocialNetwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BazzucaMedia.Infra.Interface;
using BazzucaMedia.Domain.Interface.Factory;
using BazzucaMedia.Domain.Interface.Models;
using BazzucaMedia.Domain.Interface.Services;

namespace BazzucaMedia.Domain.Interface
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

        public PostService(
            IUnitOfWork unitOfWork,
            IPostDomainFactory postFactory,
            IClientDomainFactory clientFactory,
            ISocialNetworkDomainFactory networkFactory,
            IClientService clientService,
            ISocialNetworkService networkService,
            IS3Service s3Service
        )
        {
            _unitOfWork = unitOfWork;
            _postFactory = postFactory;
            _clientFactory = clientFactory;
            _networkFactory = networkFactory;
            _clientService = clientService;
            _networkService = networkService;
            _s3Service = s3Service;
        }

        private static (DateTime Start, DateTime End) GetExtendedMonthRange(int month, int year)
        {
            // Primeiro dia do mês
            var firstOfMonth = new DateTime(year, month, 1);

            // Último dia do mês
            var lastOfMonth = firstOfMonth.AddMonths(1).AddDays(-1);

            // Buscar o sábado antes ou igual ao primeiro dia
            var start = firstOfMonth;
            while (start.DayOfWeek != DayOfWeek.Saturday)
                start = start.AddDays(-1);

            // Buscar o domingo depois ou igual ao último dia
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
                throw new ArgumentException("Post não informado");
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
                throw new ArgumentException("Post não informado");
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

        private IPublisherService GetPublisherService(SocialNetworkEnum socialNetwork)
        {
            IPublisherService publisherService = null;
            switch (socialNetwork)
            {
                case SocialNetworkEnum.X:
                    //publisherService = new TwitterService(_s3Service);
                    publisherService = new XService(_s3Service);
                    break;
                default:
                    throw new Exception("Publisher not found");
            }
            return publisherService;
        }

        public async Task<IPostModel> Publish(IPostModel post)
        {
            var publisher = GetPublisherService(post.GetSocialNetwork(_networkFactory).Network);
            await publisher.Publish(post);
            post.Status = PostStatusEnum.Posted;
            return post.Update(_postFactory);

        }
    }
}