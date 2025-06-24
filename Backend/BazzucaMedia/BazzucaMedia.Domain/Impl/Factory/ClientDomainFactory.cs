using Core.Domain;
using Core.Domain.Repository;
using BazzucaMedia.Domain.Impl.Models;
using BazzucaMedia.Domain.Interfaces.Factory;
using BazzucaMedia.Domain.Interfaces.Models;

namespace BazzucaMedia.Domain.Impl.Factory
{
    public class ClientDomainFactory : IClientDomainFactory
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IClientRepository<IClientModel, IClientDomainFactory> _repository;

        public ClientDomainFactory(IUnitOfWork unitOfWork, IClientRepository<IClientModel, IClientDomainFactory> repository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        public IClientModel BuildClientModel()
        {
            return new ClientModel(_unitOfWork, _repository);
        }
    }
}