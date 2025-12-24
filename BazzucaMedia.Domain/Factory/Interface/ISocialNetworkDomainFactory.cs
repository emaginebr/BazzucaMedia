using BazzucaMedia.Domain.Interface.Models;

namespace BazzucaMedia.Domain.Interface.Factory
{
    public interface ISocialNetworkDomainFactory
    {
        ISocialNetworkModel BuildSocialNetworkModel();
    }
}