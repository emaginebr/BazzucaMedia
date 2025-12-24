using BazzucaMedia.Domain.Interface.Factory;
using BazzucaMedia.Domain.Interface.Models;
using BazzucaMedia.Infra.Interface;
using BazzucaMedia.Infra.Interface.Repository;

namespace BazzucaMedia.Domain.Interface
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