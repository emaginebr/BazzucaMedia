using Bazzuca.Domain.Interface.Factory;
using Bazzuca.Domain.Interface.Models;
using Bazzuca.Infra.Interface;
using Bazzuca.Infra.Interface.Repository;

namespace Bazzuca.Domain.Interface
{
    public class SocialNetworkDomainFactory : ISocialNetworkDomainFactory
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISocialNetworkRepository<ISocialNetworkModel, ISocialNetworkDomainFactory> _repository;

        public SocialNetworkDomainFactory(IUnitOfWork unitOfWork, ISocialNetworkRepository<ISocialNetworkModel, ISocialNetworkDomainFactory> repository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        public ISocialNetworkModel BuildSocialNetworkModel()
        {
            return new SocialNetworkModel(_unitOfWork, _repository);
        }
    }
}