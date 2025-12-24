using System.IO;
using System.Threading.Tasks;

namespace BazzucaMedia.Domain.Interface.Services
{
    public interface IS3Service
    {
        Task<byte[]> DownloadFile(string url);
        string GetImageUrl(string fileName);
        string InsertFromStream(Stream stream, string name);
    }
}
