using BazzucaMedia.Domain.Interfaces.Factory;
using BazzucaMedia.DTO.SocialNetwork;
using System.Collections.Generic;

namespace BazzucaMedia.Domain.Interfaces.Models
{
    public interface ISocialNetworkModel
    {
        long NetworkId { get; set; }
        long ClientId { get; set; }
        SocialNetworkEnum Network { get; set; }
        string Url { get; set; }
        string User { get; set; }
        string Password { get; set; }

        IEnumerable<ISocialNetworkModel> ListByClient(long clientId, ISocialNetworkDomainFactory factory);
        ISocialNetworkModel GetById(long networkId, ISocialNetworkDomainFactory factory);
        ISocialNetworkModel Insert(ISocialNetworkDomainFactory factory);
        ISocialNetworkModel Update(ISocialNetworkDomainFactory factory);
        void Delete(long networkId);
    }
}