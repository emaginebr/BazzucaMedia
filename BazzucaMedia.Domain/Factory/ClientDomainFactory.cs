using BazzucaMedia.Domain.Interface.Factory;
using BazzucaMedia.Domain.Interface.Models;
using BazzucaMedia.Infra.Interface;
using BazzucaMedia.Infra.Interface.Repository;

namespace BazzucaMedia.Domain.Interface
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