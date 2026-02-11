using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Reflection;
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
                    var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                    var certificatePath = Environment.GetEnvironmentVariable("ASPNETCORE_Kestrel__Certificates__Default__Path");
                    var certificatePassword = Environment.GetEnvironmentVariable("ASPNETCORE_Kestrel__Certificates__Default__Password");
                    
                    // Configurar certificado se o caminho e senha estiverem dispon�veis
                    if (!string.IsNullOrEmpty(certificatePath) && !string.IsNullOrEmpty(certificatePassword))
                    {
                        if (File.Exists(certificatePath))
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
                            Console.WriteLine($"AVISO: Certificado n�o encontrado em: {certificatePath}");
                            Console.WriteLine("Executando em modo HTTP apenas");
                        }
                    }
                    else
                    {
                            Console.WriteLine("Executando sem certificado HTTPS - modo HTTP apenas");
                    }
                    
                    webBuilder.UseStartup<Startup>();
                });
    }
}
