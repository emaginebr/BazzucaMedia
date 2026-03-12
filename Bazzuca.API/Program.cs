using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Security.Cryptography.X509Certificates;

namespace Bazzuca.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.AddConsole();
                    logging.AddDebug();
                    logging.SetMinimumLevel(LogLevel.Trace);
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    var certificatePath = Path.Combine(AppContext.BaseDirectory, "emagine.pfx");
                    var certificatePassword = Environment.GetEnvironmentVariable("CERTIFICATE_PASSWORD");
                    var hasCertificate = !string.IsNullOrEmpty(certificatePassword) && File.Exists(certificatePath);

                    if (hasCertificate)
                    {
                        Console.WriteLine($"Certificado encontrado em: {certificatePath}");
                        webBuilder.UseKestrel(options =>
                        {
                            options.ListenAnyIP(80);
                            options.ListenAnyIP(443, listenOptions =>
                            {
                                listenOptions.UseHttps(certificatePath, certificatePassword);
                            });
                        });
                    }
                    else
                    {
                        Console.WriteLine("Executando sem certificado HTTPS - modo HTTP apenas");
                        webBuilder.UseKestrel(options =>
                        {
                            options.ListenAnyIP(80);
                        });
                    }

                    webBuilder.UseStartup<Startup>();
                });
    }
}
