using Bazzuca.Domain.Interface.Services;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Bazzuca.Domain.Interface
{
    public class XOAuthAuthenticator : IXAuthenticator
    {
        private const string API_KEY = "WEZZcaJIkuAZA40DSkEjBIaSb";
        private const string API_SECRET = "zjbM2rwMjAnjx1ZeXNvIvZhEZ2MNETjqN00XaCYM5jnIaNAsbN";
        //private const string ACCESS_TOKEN = "197494780-eWPXpBgu8DL1iYPTmoJ7KEZAHzqUoXkypmspJ56T";
        //private const string ACCESS_SECRET = "n1qcEUhQF65RrbHPc8VFh5CYMFstxv8khdDZdG2VwfyFi";

        public void SignRequest(
            HttpClient client, 
            HttpMethod method, 
            string url, 
            HttpContent content, 
            string oauthToken, 
            string oauthSecret
        )
        {
            var uri = new Uri(url);
            var nonce = Guid.NewGuid().ToString("N");
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();

            var parameters = new SortedDictionary<string, string>
        {
            {"oauth_consumer_key", API_KEY},
            {"oauth_nonce", nonce},
            {"oauth_signature_method", "HMAC-SHA1"},
            {"oauth_timestamp", timestamp},
            {"oauth_token", oauthToken},
            {"oauth_version", "1.0"}
        };

            if (method == HttpMethod.Get && uri.Query.Length > 1)
            {
                var queryParams = HttpUtility.ParseQueryString(uri.Query);
                foreach (var key in queryParams.AllKeys)
                {
                    if (key != null) parameters[key] = queryParams[key]!;
                }
            }

            var encodedParams = string.Join("&", parameters
                .OrderBy(p => p.Key)
                .Select(p => $"{Uri.EscapeDataString(p.Key)}={Uri.EscapeDataString(p.Value)}"));

            var baseString = string.Join("&",
                method.Method.ToUpper(),
                Uri.EscapeDataString(uri.GetLeftPart(UriPartial.Path)),
                Uri.EscapeDataString(encodedParams)
            );

            var signingKey = $"{Uri.EscapeDataString(API_SECRET)}&{Uri.EscapeDataString(oauthSecret)}";
            using var hasher = new HMACSHA1(Encoding.ASCII.GetBytes(signingKey));
            var signatureBytes = hasher.ComputeHash(Encoding.ASCII.GetBytes(baseString));
            var signature = Convert.ToBase64String(signatureBytes);

            var authHeader = $"OAuth oauth_consumer_key=\"{API_KEY}\", oauth_nonce=\"{nonce}\", oauth_signature=\"{Uri.EscapeDataString(signature)}\", oauth_signature_method=\"HMAC-SHA1\", oauth_timestamp=\"{timestamp}\", oauth_token=\"{oauthToken}\", oauth_version=\"1.0\"";

            client.DefaultRequestHeaders.Remove("Authorization");
            client.DefaultRequestHeaders.Add("Authorization", authHeader);
        }
    }
}
