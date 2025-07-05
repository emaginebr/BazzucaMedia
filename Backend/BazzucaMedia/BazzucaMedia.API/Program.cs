using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace BazzucaMedia.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
#if !DEBUG
                    webBuilder.UseKestrel(options =>
                    {
                        options.ConfigureHttpsDefaults(httpsOptions =>
                        {
                            var s = Assembly.GetExecutingAssembly().GetManifestResourceStream("BazzucaMedia.API.bazzuca.pfx");
                            using (MemoryStream ms = new MemoryStream())
                            {
                                s.CopyTo(ms);
                                httpsOptions.ServerCertificate = new X509Certificate2(ms.ToArray(), "pikpro6");
                            }
                        });
                    });
#endif
                    webBuilder.UseStartup<Startup>();
                });
    }
}
