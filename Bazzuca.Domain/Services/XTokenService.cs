using Bazzuca.DTO.SocialNetwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Bazzuca.Domain.Interface.Services;

namespace Bazzuca.Domain.Interface
{
    public class XTokenService: IXTokenService
    {
        private readonly HttpClient _httpClient;
        private const string API_KEY = "WEZZcaJIkuAZA40DSkEjBIaSb";
        private const string API_SECRET = "zjbM2rwMjAnjx1ZeXNvIvZhEZ2MNETjqN00XaCYM5jnIaNAsbN";

        public XTokenService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<OAuthTokenInfo> GetRequestTokenAsync()
        {
            var url = "https://api.x.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write";
            var nonce = Guid.NewGuid().ToString("N");
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();

            var parameters = new SortedDictionary<string, string>
            {
                {"oauth_callback", "oob"},
                {"oauth_consumer_key", API_KEY},
                {"oauth_nonce", nonce},
                {"oauth_signature_method", "HMAC-SHA1"},
                {"oauth_timestamp", timestamp},
                {"oauth_version", "1.0"}
            };

            var paramString = string.Join("&", parameters.Select(p => $"{Uri.EscapeDataString(p.Key)}={Uri.EscapeDataString(p.Value)}"));
            var baseString = $"POST&{Uri.EscapeDataString("https://api.x.com/oauth/request_token")}&{Uri.EscapeDataString(paramString)}";
            var signingKey = $"{Uri.EscapeDataString(API_SECRET)}&";

            using var hasher = new System.Security.Cryptography.HMACSHA1(Encoding.ASCII.GetBytes(signingKey));
            var signature = Convert.ToBase64String(hasher.ComputeHash(Encoding.ASCII.GetBytes(baseString)));

            //var authHeader = $"OAuth oauth_callback=\"oob\", oauth_consumer_key=\"{API_KEY}\", oauth_nonce=\"{nonce}\", oauth_signature=\"{Uri.EscapeDataString(signature)}\", oauth_signature_method=\"HMAC-SHA1\", oauth_timestamp=\"{timestamp}\", oauth_version=\"1.0\"";
            var authHeader = 
                $"oauth_callback=\"oob\", " +
                $"oauth_consumer_key=\"{API_KEY}\", " +
                $"oauth_nonce=\"{nonce}\", " +
                $"oauth_signature=\"{Uri.EscapeDataString(signature)}\", " +
                $"oauth_signature_method=\"HMAC-SHA1\", " +
                $"oauth_timestamp=\"{timestamp}\", " +
                $"oauth_version=\"1.0\"";

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("OAuth", authHeader);
            var response = await _httpClient.PostAsync(url, new StringContent(""));
            var content = await response.Content.ReadAsStringAsync();

            var query = System.Web.HttpUtility.ParseQueryString(content);
            return new OAuthTokenInfo
            {
                OAuthToken = query["oauth_token"]!,
                OauthSecret = query["oauth_token_secret"]!
            };
        }

        public string GetAuthorizeUrl(string oauthToken)
        {
            return $"https://api.twitter.com/oauth/authorize?oauth_token={oauthToken}";
        }

        public async Task<OAuthTokenInfo> GetAccessTokenAsync(string oauthToken, string oauthVerifier)
        {
            var url = $"https://api.twitter.com/oauth/access_token?oauth_verifier={oauthVerifier}&oauth_token={oauthToken}";
            var response = await _httpClient.PostAsync(url, new StringContent(""));
            var content = await response.Content.ReadAsStringAsync();
            var query = System.Web.HttpUtility.ParseQueryString(content);
            return new OAuthTokenInfo
            {
                OAuthToken = query["oauth_token"]!,
                OauthSecret = query["oauth_token_secret"]!
            };
        }

        public async Task<OAuthTokenInfo> RunUserAuthorizationFlowAsync()
        {
            var OAuthTokenInfo = await GetRequestTokenAsync();
            var authUrl = GetAuthorizeUrl(OAuthTokenInfo.OAuthToken);

            Console.WriteLine($"1. Acesse o link: {authUrl}");
            Console.Write("2. Digite o PIN fornecido pelo Twitter: ");
            var verifier = Console.ReadLine();

            OAuthTokenInfo = await GetAccessTokenAsync(OAuthTokenInfo.OAuthToken, verifier!);

            // Aqui você pode salvar accessToken e accessSecret no banco de dados
            //Console.WriteLine($"Access Token: {accessToken}\nAccess Secret: {accessSecret}");
            return OAuthTokenInfo;
        }
    }
}
