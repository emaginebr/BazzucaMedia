using Bazzuca.DTO.SocialNetwork;
using System.Collections.Generic;
using Bazzuca.Infra.Interface;
using Bazzuca.Infra.Interface.Repository;
using Bazzuca.Domain.Interface.Factory;
using Bazzuca.Domain.Interface.Models;

namespace Bazzuca.Domain.Interface
{
    public class SocialNetworkModel : ISocialNetworkModel
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISocialNetworkRepository<ISocialNetworkModel, ISocialNetworkDomainFactory> _repository;

        public SocialNetworkModel(IUnitOfWork unitOfWork, ISocialNetworkRepository<ISocialNetworkModel, ISocialNetworkDomainFactory> repository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        public long NetworkId { get; set; }
        public long ClientId { get; set; }
        public SocialNetworkEnum Network { get; set; }
        public string Url { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string AccessToken { get; set; }
        public string AccessSecret { get; set; }

        public IEnumerable<ISocialNetworkModel> ListByClient(long clientId, ISocialNetworkDomainFactory factory)
            => _repository.ListByClient(clientId, factory);

        public ISocialNetworkModel GetById(long networkId, ISocialNetworkDomainFactory factory)
            => _repository.GetById(networkId, factory);

        public ISocialNetworkModel Insert(ISocialNetworkDomainFactory factory)
            => _repository.Insert(this, factory);

        public ISocialNetworkModel Update(ISocialNetworkDomainFactory factory)
            => _repository.Update(this, factory);

        public void Delete(long networkId)
            => _repository.Delete(networkId);
    }
}