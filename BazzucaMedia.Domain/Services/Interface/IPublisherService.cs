using BazzucaMedia.Domain.Interface.Models;
using System.Threading.Tasks;

namespace BazzucaMedia.Domain.Interface.Services
{
    public interface IPublisherService
    {
        Task Publish(IPostModel post);
    }
}
