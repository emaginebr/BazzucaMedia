using BazzucaSocial.Domain.Interfaces.Models;

namespace BazzucaSocial.Domain.Interfaces.Factory
{
    public interface ISocialNetworkDomainFactory
    {
        ISocialNetworkModel BuildSocialNetworkModel();
    }
}