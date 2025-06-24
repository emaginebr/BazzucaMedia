using BazzucaMedia.Domain.Interfaces.Models;

namespace BazzucaMedia.Domain.Interfaces.Factory
{
    public interface IPostDomainFactory
    {
        IPostModel BuildPostModel();
    }
}