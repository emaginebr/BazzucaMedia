using Bazzuca.Application;
using Bazzuca.Domain.Interface.Services;
using Bazzuca.Infra.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Bazzuca.Console
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var host = Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, config) =>
                {
                    config.AddJsonFile("appsettings.json", optional: false);
                })
                .ConfigureServices((context, services) =>
                {
                    Initializer.Configure(services, context.Configuration, false);
                })
                .Build();

            var postId = GetArgValue(args, "--postId");
            var tenantId = GetArgValue(args, "--tenantId");

            if (postId == null || tenantId == null)
            {
                System.Console.WriteLine("Usage: dotnet run --project Bazzuca.Console -- --postId <id> --tenantId <tenant>");
                return;
            }

            using var scope = host.Services.CreateScope();
            var postService = scope.ServiceProvider.GetRequiredService<IPostService>();
            var linkedinAppService = scope.ServiceProvider.GetRequiredService<ILinkedinAppService>();
            var networkService = scope.ServiceProvider.GetRequiredService<ISocialNetworkService>();
            var s3Service = scope.ServiceProvider.GetRequiredService<IS3Service>();

            var post = postService.GetById(long.Parse(postId));
            if (post == null)
            {
                System.Console.WriteLine($"Post {postId} not found");
                return;
            }

            var network = networkService.GetById(post.NetworkId);
            if (network == null)
            {
                System.Console.WriteLine($"Network {post.NetworkId} not found");
                return;
            }

            string tempMediaPath = null;
            try
            {
                if (!string.IsNullOrEmpty(post.MediaUrl))
                {
                    var mediaBytes = await s3Service.DownloadFile(post.MediaUrl);
                    if (mediaBytes != null && mediaBytes.Length > 0)
                    {
                        var extension = System.IO.Path.GetExtension(post.MediaUrl) ?? ".jpg";
                        tempMediaPath = System.IO.Path.Combine(System.IO.Path.GetTempPath(), $"linkedin-console-{post.PostId}{extension}");
                        await System.IO.File.WriteAllBytesAsync(tempMediaPath, mediaBytes);
                    }
                }

                System.Console.WriteLine($"Publishing post {postId} to LinkedIn (headless: false)...");
                await linkedinAppService.PublishPost(
                    network.User,
                    network.Password,
                    post.ClientId,
                    post.Title,
                    post.Description,
                    tempMediaPath,
                    headless: false);

                System.Console.WriteLine("Post published successfully!");
            }
            finally
            {
                if (tempMediaPath != null && System.IO.File.Exists(tempMediaPath))
                {
                    try { System.IO.File.Delete(tempMediaPath); } catch { }
                }
            }
        }

        private static string GetArgValue(string[] args, string key)
        {
            var index = Array.IndexOf(args, key);
            return index >= 0 && index < args.Length - 1 ? args[index + 1] : null;
        }
    }
}
