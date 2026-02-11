using Bazzuca.Domain.Interface.Factory;
using Bazzuca.Domain.Interface.Models;
using Bazzuca.Infra.Interface;
using Bazzuca.Infra.Interface.Repository;

namespace Bazzuca.Domain.Interface
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