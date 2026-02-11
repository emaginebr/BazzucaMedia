using Bazzuca.Domain.Interface.Models;
using System.Threading.Tasks;

namespace Bazzuca.Domain.Interface.Services
{
    public interface IPublisherService
    {
        Task Publish(IPostModel post);
    }
}
