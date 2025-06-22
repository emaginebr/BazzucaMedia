using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.Domain.Interfaces.Models;
using BazzucaSocial.DTO.Post;
using Core.Domain;
using Core.Domain.Repository;
using System;
using System.Collections.Generic;

namespace BazzucaSocial.Domain.Impl.Models
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
        public string S3Key { get; set; }
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

        public IEnumerable<IPostModel> ListByUser(long userId, IPostDomainFactory factory)
            => _repository.ListByUser(userId, factory);

        public IPostModel GetById(long postId, IPostDomainFactory factory)
            => _repository.GetById(postId, factory);

        public IPostModel Insert(IPostDomainFactory factory)
            => _repository.Insert(this, factory);

        public IPostModel Update(IPostDomainFactory factory)
            => _repository.Update(this, factory);
    }
}