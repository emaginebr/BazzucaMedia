using Bazzuca.Domain.Interface.Factory;
using Bazzuca.Domain.Interface.Models;
using Bazzuca.Infra.Interface;
using Bazzuca.Infra.Interface.Repository;

namespace Bazzuca.Domain.Interface
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