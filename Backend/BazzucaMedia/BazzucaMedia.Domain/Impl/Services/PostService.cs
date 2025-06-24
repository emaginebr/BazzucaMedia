using BazzucaMedia.Domain.Interfaces.Factory;
using BazzucaMedia.Domain.Interfaces.Models;
using BazzucaMedia.Domain.Interfaces.Services;
using BazzucaMedia.DTO.Post;
using Core.Domain;
using System;
using System.Collections.Generic;

namespace BazzucaMedia.Domain.Impl.Services
{
    public class PostService : IPostService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPostDomainFactory _postFactory;
        private readonly IClientDomainFactory _clientFactory;
        private readonly ISocialNetworkDomainFactory _networkFactory;
        private readonly IClientService _clientService;
        private readonly ISocialNetworkService _networkService;

        public PostService(
            IUnitOfWork unitOfWork,
            IPostDomainFactory postFactory,
            IClientDomainFactory clientFactory,
            ISocialNetworkDomainFactory networkFactory,
            IClientService clientService,
            ISocialNetworkService networkService
        )
        {
            _unitOfWork = unitOfWork;
            _postFactory = postFactory;
            _clientFactory = clientFactory;
            _networkFactory = networkFactory;
            _clientService = clientService;
            _networkService = networkService;
        }

        public IEnumerable<IPostModel> ListByUser(long userId)
        {
            return _postFactory.BuildPostModel().ListByUser(userId, _postFactory);
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

        public IPostModel Insert(PostInfo post)
        {
            if (post == null)
            {
                throw new ArgumentException("Post não informado");
            }
            var model = _postFactory.BuildPostModel();

            var scheduleDate = DateTime.SpecifyKind(post.ScheduleDate, DateTimeKind.Unspecified);

            model.PostId = post.PostId;
            model.ClientId = post.ClientId;
            model.NetworkId = post.NetworkId;
            model.PostType = post.PostType;
            model.MediaUrl = post.MediaUrl;
            model.ScheduleDate = scheduleDate;
            model.Title = post.Title;
            model.Description = post.Description;
            model.Status = post.Status;

            return model.Insert(_postFactory);
        }

        public IPostModel Update(PostInfo post)
        {
            if (post == null)
            {
                throw new ArgumentException("Post não informado");
            }
            var model = _postFactory.BuildPostModel().GetById(post.PostId, _postFactory);

            var scheduleDate = DateTime.SpecifyKind(post.ScheduleDate, DateTimeKind.Unspecified);

            model.ClientId = post.ClientId;
            model.NetworkId = post.NetworkId;
            model.PostType = post.PostType;
            model.MediaUrl = post.MediaUrl;
            model.ScheduleDate = scheduleDate;
            model.Title = post.Title;
            model.Description = post.Description;
            model.Status = post.Status;

            return model.Update(_postFactory);
        }
    }
}