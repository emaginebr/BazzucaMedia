using Bazzuca.DTO.Post;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Bazzuca.Domain.Interface.Services
{
    public interface ILinkedinService
    {
        Task Process(PostInfo postInfo, IDictionary<string, object> headers);
    }
}
