using System.Drawing;
using System.Threading.Tasks;

namespace Core.Domain.Cloud
{
    public interface IAssetsProviders
    {
        Bitmap GetBaseAssets(string baseFolder, string imgPath);
        Task<string> UploadFileToBlobAsync(string strFileName, byte[] fileData, string fileMimeType);
        Task DeleteFile(string strFileName);
    }
}
