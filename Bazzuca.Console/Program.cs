using Bazzuca.Application;
using Bazzuca.Domain.Interface.Services;
using Bazzuca.DTO.Post;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Bazzuca.Console
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var host = Host.CreateDefaultBuilder(args)
                .UseContentRoot(AppContext.BaseDirectory)
                .ConfigureServices((context, services) =>
                {
                    Initializer.Configure(services, context.Configuration, false);
                })
                .Build();

            var payloadPath = GetArgValue(args, "--payload");
            var userId = GetArgValue(args, "--userId");

            if (payloadPath == null || userId == null)
            {
                System.Console.WriteLine("Usage: dotnet run --project Bazzuca.Console -- --payload <path-to-json> --userId <userId>");
                return;
            }

            var json = File.ReadAllText(payloadPath);
            var postInfo = JsonConvert.DeserializeObject<PostInfo>(json);
            if (postInfo == null)
            {
                System.Console.WriteLine("Failed to deserialize PostInfo from payload file");
                return;
            }

            using var scope = host.Services.CreateScope();
            var postService = scope.ServiceProvider.GetRequiredService<IPostService>();

            System.Console.WriteLine("Publishing post directly (visible browser)...");
            var result = await postService.PublishDirect(postInfo, long.Parse(userId), headless: false);
            System.Console.WriteLine($"Post {result.PostId} published successfully with status {result.Status}");
        }

        private static string GetArgValue(string[] args, string key)
        {
            var index = Array.IndexOf(args, key);
            return index >= 0 && index < args.Length - 1 ? args[index + 1] : null;
        }
    }
}
