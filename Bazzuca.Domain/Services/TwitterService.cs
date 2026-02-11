using Bazzuca.Domain.Interface.Models;
using Bazzuca.Domain.Interface.Services;
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Tweetinvi;

namespace Bazzuca.Domain.Interface
{
    public class TwitterService : ITwitterService
    {
        private const string API_KEY = "WEZZcaJIkuAZA40DSkEjBIaSb";
        private const string API_SECRET = "zjbM2rwMjAnjx1ZeXNvIvZhEZ2MNETjqN00XaCYM5jnIaNAsbN";
        private const string ACCESS_TOKEN = "197494780-eWPXpBgu8DL1iYPTmoJ7KEZAHzqUoXkypmspJ56T";
        private const string ACCESS_SECRET = "n1qcEUhQF65RrbHPc8VFh5CYMFstxv8khdDZdG2VwfyFi";
        private const string CLIENT_ID = "VTBEdnN3NVFaQ0IyMUZ2a3dXdmg6MTpjaQ";
        private const string CLIENT_SECRET = "dOnCrMsVHMjM_NMan7rJC3P-wnDg84SziswTrRBA4zdZ-_0kMU";
        private const string BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAGsA2wEAAAAAZJ77zVkO05AG5OM2pqO0ab9TG8g%3DJ1GIcNt42pdTWFxw1rkFMULyxskFpZjDSMYzt8ADcgR1jW9pGK";

        private readonly IS3Service _s3Service;

        public TwitterService(IS3Service imageService)
        {
            _s3Service = imageService;
        }

        public async Task Publish(IPostModel post)
        {
            var userClient = new TwitterClient(API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_SECRET);
            //var userClient = new TwitterClient(API_KEY, API_SECRET, BEARER_TOKEN);

            var fileBuffer = await _s3Service.DownloadFile(post.MediaUrl);

            var media = await userClient.Upload.UploadMessageVideoAsync(fileBuffer);

            /*
            await userClient.Tweets.PublishTweetAsync(new PublishTweetParameters(post.Description)
            {
                Medias = { media }
            });
            */

            var json = JsonSerializer.Serialize(new
            {
                text = post.Description,
                media = new { media_ids = new[] { media.Id.ToString() } }
            });

            // Fix: Convert the JSON string to StringContent, which implements HttpContent
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await userClient.Execute.AdvanceRequestAsync(request =>
            {
                request.Query.Url = "https://api.x.com/2/tweets";
                request.Query.HttpMethod = Tweetinvi.Models.HttpMethod.POST;
                request.Query.HttpContent = httpContent; // Corrected to use HttpContent
                /*
                request.Query.CustomHeaders = new CustomRequestHeaders
                {
                        { "Content-Type", "application/json" } // Correctly set the Content-Type header
                };
                */
            });

            if (!response.Response.IsSuccessStatusCode)
            {
                throw new Exception("X error: " + response.Response.Content);
            }
        }
    }
}
