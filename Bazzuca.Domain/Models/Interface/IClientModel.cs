using Bazzuca.DTO.SocialNetwork;
using System.Collections.Generic;
using Bazzuca.Domain.Interface.Factory;

namespace Bazzuca.Domain.Interface.Models
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