using BazzucaMedia.Domain.Interface.Models;

namespace BazzucaMedia.Domain.Interface.Factory
{
    public interface IPostDomainFactory
    {
        IPostModel BuildPostModel();
    }
}