using BazzucaMedia.Domain.Impl.Models;
using BazzucaMedia.Domain.Interfaces.Factory;
using BazzucaMedia.Domain.Interfaces.Models;
using Core.Domain;
using Core.Domain.Repository;

namespace BazzucaMedia.Domain.Impl.Factory
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