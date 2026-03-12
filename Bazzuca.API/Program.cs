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

                    if (!string.IsNullOrEmpty(certificatePassword) && File.Exists(certificatePath))
                    {
                        Console.WriteLine($"Certificado encontrado em: {certificatePath}");
                        webBuilder.UseKestrel(options =>
                        {
                            options.ConfigureHttpsDefaults(httpsOptions =>
                            {
                                httpsOptions.ServerCertificate = new X509Certificate2(certificatePath, certificatePassword);
                            });
                        });
                    }
                    else
                    {
                        Console.WriteLine("Executando sem certificado HTTPS - modo HTTP apenas");
                    }

                    webBuilder.UseStartup<Startup>();
                });
    }
}
