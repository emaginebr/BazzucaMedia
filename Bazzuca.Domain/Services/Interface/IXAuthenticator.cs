using System.Net.Http;

namespace Bazzuca.Domain.Interface.Services
{
    public interface IXAuthenticator
    {
        void SignRequest(
            HttpClient client, 
            HttpMethod method, 
            string url, 
            HttpContent content, 
            string oauthToken,
            string oauthSecret
        );
    }
}
