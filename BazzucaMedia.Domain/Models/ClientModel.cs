using BazzucaMedia.DTO.SocialNetwork;
using System.Collections.Generic;
using System.Linq;
using BazzucaMedia.Infra.Interface;
using BazzucaMedia.Infra.Interface.Repository;
using BazzucaMedia.Domain.Interface.Factory;
using BazzucaMedia.Domain.Interface.Models;

namespace BazzucaMedia.Domain.Interface
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

        public IList<SocialNetworkEnum> GetSocialNetworks(ISocialNetworkDomainFactory factory)
        {
            if (!(ClientId > 0))
            {
                return new List<SocialNetworkEnum>();
            }
            return factory.BuildSocialNetworkModel()
                .ListByClient(ClientId, factory)
                .Select(x => x.Network)
                .ToList();
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