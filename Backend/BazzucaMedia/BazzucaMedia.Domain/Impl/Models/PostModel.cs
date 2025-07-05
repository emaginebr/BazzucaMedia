using BazzucaMedia.Domain.Interfaces.Factory;
using BazzucaMedia.Domain.Interfaces.Models;
using BazzucaMedia.DTO.Post;
using BazzucaMedia.DTO.SocialNetwork;
using Core.Domain;
using Core.Domain.Repository;
using System;
using System.Collections.Generic;

namespace BazzucaMedia.Domain.Impl.Models
{
    public class PostModel : IPostModel
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPostRepository<IPostModel, IPostDomainFactory> _repository;

        public PostModel(IUnitOfWork unitOfWork, IPostRepository<IPostModel, IPostDomainFactory> repository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        public long PostId { get; set; }
        public long NetworkId { get; set; }
        public long ClientId { get; set; }
        public DateTime ScheduleDate { get; set; }
        public PostTypeEnum PostType { get; set; }
        public string MediaUrl { get; set; }
        public string Title { get; set; }
        public PostStatusEnum Status { get; set; }
        public string Description { get; set; }

        public ISocialNetworkModel GetSocialNetwork(ISocialNetworkDomainFactory factory)
        {
            if (!(NetworkId > 0))
            {
                return null;
            }
            return factory.BuildSocialNetworkModel().GetById(NetworkId, factory);
        }

        public IClientModel GetClient(IClientDomainFactory factory)
        {
            if (!(ClientId > 0))
            {
                return null;
            }
            return factory.BuildClientModel().GetById(ClientId, factory);
        }

        public IEnumerable<IPostModel> ListByUser(long userId, DateTime start, DateTime end, IPostDomainFactory factory)
            => _repository.ListByUser(userId, start, end, factory);

        public IPostModel GetById(long postId, IPostDomainFactory factory)
            => _repository.GetById(postId, factory);

        public IPostModel GetByScheduleDate(long userId, DateTime scheduleDate, IPostDomainFactory factory)
        {
            return _repository.GetByScheduleDate(userId, scheduleDate, factory);
        }

        public IPostModel Insert(IPostDomainFactory factory)
            => _repository.Insert(this, factory);

        public IPostModel Update(IPostDomainFactory factory)
            => _repository.Update(this, factory);

        public IEnumerable<IPostModel> Search(
            long userId, long? clientId, SocialNetworkEnum? network, PostStatusEnum? status,
            int pageNum, out int pageCount, IPostDomainFactory factory
        )
        {
            return _repository.Search(
                userId,
                clientId,
                network.HasValue ? (int)network.Value : null,
                status.HasValue ? (int)status.Value : null,
                pageNum,
                out pageCount,
                factory
            );
        }
    }
}