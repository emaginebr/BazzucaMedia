using BazzucaMedia.Domain.Interfaces.Models;
using System.Threading.Tasks;

namespace BazzucaMedia.Domain.Interfaces.Services
{
    public interface IPublisherService
    {
        Task Publish(IPostModel post);
    }
}
