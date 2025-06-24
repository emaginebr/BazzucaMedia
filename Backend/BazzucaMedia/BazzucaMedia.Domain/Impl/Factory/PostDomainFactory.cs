using Core.Domain;
using Core.Domain.Repository;
using BazzucaMedia.Domain.Impl.Models;
using BazzucaMedia.Domain.Interfaces.Factory;
using BazzucaMedia.Domain.Interfaces.Models;

namespace BazzucaMedia.Domain.Impl.Factory
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