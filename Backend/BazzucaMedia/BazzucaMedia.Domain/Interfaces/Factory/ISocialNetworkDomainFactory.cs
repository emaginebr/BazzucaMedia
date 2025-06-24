using BazzucaMedia.Domain.Interfaces.Models;

namespace BazzucaMedia.Domain.Interfaces.Factory
{
    public interface ISocialNetworkDomainFactory
    {
        ISocialNetworkModel BuildSocialNetworkModel();
    }
}