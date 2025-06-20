using Core.Domain;
using Core.Domain.Repository;
using BazzucaSocial.Domain.Impl.Models;
using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.Domain.Interfaces.Models;

namespace BazzucaSocial.Domain.Impl.Factory
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