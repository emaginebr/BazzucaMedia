using Bazzuca.Domain.Interface.Models;

namespace Bazzuca.Domain.Interface.Factory
{
    public interface IPostDomainFactory
    {
        IPostModel BuildPostModel();
    }
}