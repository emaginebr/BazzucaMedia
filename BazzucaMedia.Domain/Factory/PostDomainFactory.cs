using BazzucaMedia.Domain.Interface.Factory;
using BazzucaMedia.Domain.Interface.Models;
using BazzucaMedia.Infra.Interface;
using BazzucaMedia.Infra.Interface.Repository;

namespace BazzucaMedia.Domain.Interface
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