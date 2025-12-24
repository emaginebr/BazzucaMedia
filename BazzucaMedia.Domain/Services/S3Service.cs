using Amazon.S3;
using Amazon.S3.Transfer;
using BazzucaMedia.Domain.Interface.Services;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace BazzucaMedia.Domain.Interface
{
    public class S3Service : IS3Service
    {

        private const string ACCESS_KEY = "DO00JY46P2RAD368YY3B";
        private const string SECRET_KEY = "6aojG9/UVwcn9Ss8mT7HNCPPUCk2GF1bG/CarPcC5n0";
        private const string BUCKET_NAME = "bazzucasocial";
        private const string REGION = "nyc3"; // ou fra1, sgp1, etc.
        private const string ENDPOINT = "https://emagine.nyc3.digitaloceanspaces.com";

        public string GetImageUrl(string fileName)
        {
            if (!string.IsNullOrEmpty(fileName))
            {
                return ENDPOINT + "/" + BUCKET_NAME + "/" + fileName;
            }
            return string.Empty;
        }

        public async Task<byte[]> DownloadFile(string url)
        {
            using (var httpClient = new HttpClient())
            {

                return await httpClient.GetByteArrayAsync(url);
            }
        }

        private void UploadFile(Stream fileStream, string fileName)
        {
            var config = new AmazonS3Config
            {
                ServiceURL = ENDPOINT,
                ForcePathStyle = true,
                //SignatureVersion = "v4",
            };

            using var client = new AmazonS3Client(ACCESS_KEY, SECRET_KEY, config);
            var transferUtility = new TransferUtility(client);

            var request = new TransferUtilityUploadRequest
            {
                InputStream = fileStream,
                Key = fileName,
                BucketName = BUCKET_NAME,
                CannedACL = S3CannedACL.PublicRead // ou Private se quiser restrito
            };

            transferUtility.Upload(request);
        }

        public string InsertFromStream(Stream stream, string name)
        {
            UploadFile(stream, name);
            return name;
        }
    }
}
