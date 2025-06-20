using Core.Domain;
using Core.Domain.Repository;
using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.Domain.Interfaces.Models;
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
        public long UserId { get; set; }
        public DateTime ScheduleDate { get; set; }
        public int PostType { get; set; }
        public string S3Key { get; set; }
        public string Title { get; set; }
        public int Status { get; set; }
        public string Description { get; set; }

        public IEnumerable<IPostModel> ListByUser(long userId, int take, IPostDomainFactory factory)
            => _repository.ListByUser(userId, take, factory);

        public IPostModel GetById(long postId, IPostDomainFactory factory)
            => _repository.GetById(postId, factory);

        public IPostModel Insert(IPostDomainFactory factory)
            => _repository.Insert(this, factory);

        public IPostModel Update(IPostDomainFactory factory)
            => _repository.Update(this, factory);
    }
}