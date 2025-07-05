using BazzucaMedia.Domain.Interfaces.Factory;
using BazzucaMedia.DTO.SocialNetwork;
using System.Collections.Generic;

namespace BazzucaMedia.Domain.Interfaces.Models
{
    public interface IClientModel
    {
        long ClientId { get; set; }
        long UserId { get; set; }
        string Name { get; set; }

        IList<SocialNetworkEnum> GetSocialNetworks(ISocialNetworkDomainFactory factory);

        IEnumerable<IClientModel> ListByUser(long userId, IClientDomainFactory factory);
        IClientModel GetById(long clientId, IClientDomainFactory factory);
        IClientModel Insert(IClientDomainFactory factory);
        IClientModel Update(IClientDomainFactory factory);
        void Delete(long clientId);
    }
}