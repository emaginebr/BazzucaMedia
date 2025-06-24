using BazzucaMedia.Domain.Interfaces.Models;

namespace BazzucaMedia.Domain.Interfaces.Factory
{
    public interface IClientDomainFactory
    {
        IClientModel BuildClientModel();
    }
}