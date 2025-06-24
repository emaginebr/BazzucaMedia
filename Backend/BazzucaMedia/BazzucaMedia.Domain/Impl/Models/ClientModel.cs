using Core.Domain;
using Core.Domain.Repository;
using BazzucaMedia.Domain.Interfaces.Factory;
using BazzucaMedia.Domain.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BazzucaMedia.Domain.Impl.Models
{
    public class ClientModel : IClientModel
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IClientRepository<IClientModel, IClientDomainFactory> _repository;

        public ClientModel(IUnitOfWork unitOfWork, IClientRepository<IClientModel, IClientDomainFactory> repository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        public long ClientId { get; set; }
        public long UserId { get; set; }
        public string Name { get; set; }

        public string GetSocialNetworks(ISocialNetworkDomainFactory factory)
        {
            if (!(ClientId > 0))
            {
                return string.Empty;
            }
            var networks = factory.BuildSocialNetworkModel()
                .ListByClient(ClientId, factory)
                .Select(x => x.Network.ToString());
            return string.Join(", ", networks);
        }

        public IEnumerable<IClientModel> ListByUser(long userId, IClientDomainFactory factory)
            => _repository.ListByUser(userId, factory);

        public IClientModel GetById(long clientId, IClientDomainFactory factory)
            => _repository.GetById(clientId, factory);

        public IClientModel Insert(IClientDomainFactory factory)
            => _repository.Insert(this, factory);

        public IClientModel Update(IClientDomainFactory factory)
            => _repository.Update(this, factory);

        public void Delete(long clientId) 
            => _repository.Delete(clientId);
    }
}