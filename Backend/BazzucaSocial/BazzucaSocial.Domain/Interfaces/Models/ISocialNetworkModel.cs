using BazzucaSocial.Domain.Interfaces.Factory;
using System.Collections.Generic;

namespace BazzucaSocial.Domain.Interfaces.Models
{
    public interface ISocialNetworkModel
    {
        long NetworkId { get; set; }
        long UserId { get; set; }
        int NetworkKey { get; set; }
        string Url { get; set; }
        string User { get; set; }
        string Password { get; set; }

        IEnumerable<ISocialNetworkModel> ListByUser(long userId, int take, ISocialNetworkDomainFactory factory);
        ISocialNetworkModel GetById(long networkId, ISocialNetworkDomainFactory factory);
        ISocialNetworkModel Insert(ISocialNetworkDomainFactory factory);
        ISocialNetworkModel Update(ISocialNetworkDomainFactory factory);
    }
}