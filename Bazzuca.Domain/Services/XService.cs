using Bazzuca.Domain.Interface.Models;
using Bazzuca.Domain.Interface.Services;
using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Bazzuca.Domain.Interface
{
    public class XService : IXService
    {
        //private readonly string _apiUrl = "https://upload.twitter.com/1.1/media/upload.json";
        private const string API_UPLOAD_URL = "https://api.x.com/2/media/upload";
        private const string API_POST_URL = "https://api.x.com/2/tweets";

        private readonly HttpClient _httpClient;
        private readonly IXAuthenticator _auth; // Abstração da autenticação OAuth1.0a

        private readonly IS3Service _s3Service;

        public XService(IS3Service imageService)
        {
            _httpClient = new HttpClient();
            _auth = new XOAuthAuthenticator();

            _s3Service = imageService;
        }

        public async Task<string> UploadVideoAsync(byte[] videoBytes, string oauthToken, string oauthSecret, string mediaType = "video/mp4")
        {
            // INIT
            var initContent = new MultipartFormDataContent
            {
                { new StringContent("INIT"), "command" },
                { new StringContent(mediaType), "media_type" },
                { new StringContent("tweet_video"), "media_category" },
                { new StringContent(videoBytes.Length.ToString()), "total_bytes" }
            };
            _auth.SignRequest(
                _httpClient, 
                HttpMethod.Post, 
                API_UPLOAD_URL + "/initialize", 
                initContent,
                oauthToken,
                oauthSecret
            );
            var initRes = await _httpClient.PostAsync(API_UPLOAD_URL, initContent);
            initRes.EnsureSuccessStatusCode();
            var initObj = JsonDocument.Parse(await initRes.Content.ReadAsStringAsync());
            string mediaId = initObj.RootElement.GetProperty("media_id_string").GetString()!;

            // APPEND (porções de até 5MB)
            const int chunkSize = 5 * 1024 * 1024;
            int segmentIndex = 0;
            for (int offset = 0; offset < videoBytes.Length; offset += chunkSize)
            {
                int length = Math.Min(chunkSize, videoBytes.Length - offset);
                var chunk = videoBytes.Skip(offset).Take(length).ToArray();

                var appendContent = new MultipartFormDataContent
                {
                    { new StringContent("APPEND"), "command" },
                    { new StringContent(mediaId), "media_id" },
                    { new StringContent(segmentIndex.ToString()), "segment_index" },
                    { new ByteArrayContent(chunk), "media" }
                };
                _auth.SignRequest(
                    _httpClient, 
                    HttpMethod.Post, 
                    API_UPLOAD_URL, 
                    appendContent,
                    oauthToken,
                    oauthSecret
                );
                var appendRes = await _httpClient.PostAsync(API_UPLOAD_URL, appendContent);
                appendRes.EnsureSuccessStatusCode();
                segmentIndex++;
            }

            // FINALIZE
            var finalizeContent = new MultipartFormDataContent
            {
                { new StringContent("FINALIZE"), "command" },
                { new StringContent(mediaId), "media_id" }
            };
            _auth.SignRequest(
                _httpClient, 
                HttpMethod.Post, 
                API_UPLOAD_URL, 
                finalizeContent,
                oauthToken,
                oauthSecret
            );
            var finalizeRes = await _httpClient.PostAsync(API_UPLOAD_URL, finalizeContent);
            finalizeRes.EnsureSuccessStatusCode();

            // STATUS (aguarda processamento)
            while (true)
            {
                await Task.Delay(2000);
                var statusUrl = $"{API_UPLOAD_URL}?command=STATUS&media_id={mediaId}";
                _auth.SignRequest(
                    _httpClient, 
                    HttpMethod.Get, 
                    statusUrl, 
                    null,
                    oauthToken,
                    oauthSecret
                );
                var statusRes = await _httpClient.GetAsync(statusUrl);
                var statusObj = JsonDocument.Parse(await statusRes.Content.ReadAsStringAsync());

                if (statusObj.RootElement.TryGetProperty("processing_info", out var info))
                {
                    var state = info.GetProperty("state").GetString();
                    if (state == "succeeded")
                    {
                        break;
                    }
                    if (state == "failed")
                    {
                        throw new Exception("Media processing failed");
                    }
                }
                else break;
            }

            return mediaId;
        }

        public async Task<bool> CreatePostWithMediaAsync(string text, string mediaId, string oauthToken, string oauthSecret)
        {
            var payload = new
            {
                text,
                media = new { media_ids = new[] { mediaId } }
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _auth.SignRequest(
                _httpClient, 
                HttpMethod.Post, 
                API_POST_URL, 
                content,
                oauthToken,
                oauthSecret
            );
            var response = await _httpClient.PostAsync(API_POST_URL, content);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                //Console.Error.WriteLine($"Failed to post tweet: {error}");
                throw new Exception(error);
            }

            return true;
        }

        public async Task Publish(IPostModel post)
        {
            var fileBuffer = await _s3Service.DownloadFile(post.MediaUrl);

            var mediaId = await UploadVideoAsync(fileBuffer, "", "");
            await CreatePostWithMediaAsync(post.Description, mediaId, "", "");
        }
    }
}
