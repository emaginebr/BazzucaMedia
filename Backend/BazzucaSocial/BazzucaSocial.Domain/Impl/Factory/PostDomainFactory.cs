using Core.Domain;
using Core.Domain.Repository;
using BazzucaSocial.Domain.Impl.Models;
using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.Domain.Interfaces.Models;

namespace BazzucaSocial.Domain.Impl.Factory
{
    public class PostDomainFactory : IPostDomainFactory
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPostRepository<IPostModel, IPostDomainFactory> _repository;

        public PostDomainFactory(IUnitOfWork unitOfWork, IPostRepository<IPostModel, IPostDomainFactory> repository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        public IPostModel BuildPostModel()
        {
            return new PostModel(_unitOfWork, _repository);
        }
    }
}