using BazzucaMedia.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace BazzucaMedia.Domain.Impl.Services
{
    public class XOAuthAuthenticator : IXAuthenticator
    {
        private const string API_KEY = "WEZZcaJIkuAZA40DSkEjBIaSb";
        private const string API_SECRET = "zjbM2rwMjAnjx1ZeXNvIvZhEZ2MNETjqN00XaCYM5jnIaNAsbN";
        private const string ACCESS_TOKEN = "197494780-eWPXpBgu8DL1iYPTmoJ7KEZAHzqUoXkypmspJ56T";
        private const string ACCESS_SECRET = "n1qcEUhQF65RrbHPc8VFh5CYMFstxv8khdDZdG2VwfyFi";

        public void SignRequest(HttpClient client, HttpMethod method, string url, HttpContent? content)
        {
            var uri = new Uri(url);
            var nonce = Guid.NewGuid().ToString("N");
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();

            // Parâmetros OAuth obrigatórios
            var parameters = new SortedDictionary<string, string>
            {
                {"oauth_consumer_key", API_KEY},
                {"oauth_nonce", nonce},
                {"oauth_signature_method", "HMAC-SHA1"},
                {"oauth_timestamp", timestamp},
                {"oauth_token", ACCESS_TOKEN},
                {"oauth_version", "1.0"}
            };

            // Parâmetros de query string (GET)
            if (method == HttpMethod.Get && uri.Query.Length > 1)
            {
                var queryParams = HttpUtility.ParseQueryString(uri.Query);
                foreach (var key in queryParams.AllKeys)
                {
                    if (key != null) parameters[key] = queryParams[key]!;
                }
            }

            // Parâmetros do corpo (POST com form-data ou x-www-form-urlencoded)
            if (method == HttpMethod.Post && content is FormUrlEncodedContent)
            {
                var body = content.ReadAsStringAsync().Result;
                var bodyParams = HttpUtility.ParseQueryString(body);
                foreach (var key in bodyParams.AllKeys)
                {
                    if (key != null) parameters[key] = bodyParams[key]!;
                }
            }

            // Monta a base string de assinatura
            var encodedParams = string.Join("&", parameters
                .OrderBy(p => p.Key)
                .Select(p => $"{Uri.EscapeDataString(p.Key)}={Uri.EscapeDataString(p.Value)}"));

            var baseString = string.Join("&",
                method.Method.ToUpper(),
                Uri.EscapeDataString(uri.GetLeftPart(UriPartial.Path)),
                Uri.EscapeDataString(encodedParams)
            );

            // Gera a assinatura HMAC-SHA1
            var signingKey = $"{Uri.EscapeDataString(API_SECRET)}&{Uri.EscapeDataString(ACCESS_SECRET)}";
            using var hasher = new HMACSHA1(Encoding.ASCII.GetBytes(signingKey));
            var signatureBytes = hasher.ComputeHash(Encoding.ASCII.GetBytes(baseString));
            var signature = Convert.ToBase64String(signatureBytes);

            // Monta o cabeçalho Authorization
            var authHeaderParams = new List<string>
            {
                $"oauth_consumer_key=\"{Uri.EscapeDataString(API_KEY)}\"",
                $"oauth_nonce=\"{Uri.EscapeDataString(nonce)}\"",
                $"oauth_signature=\"{Uri.EscapeDataString(signature)}\"",
                $"oauth_signature_method=\"HMAC-SHA1\"",
                $"oauth_timestamp=\"{Uri.EscapeDataString(timestamp)}\"",
                $"oauth_token=\"{Uri.EscapeDataString(ACCESS_TOKEN)}\"",
                $"oauth_version=\"1.0\""
            };
            var authHeader = "OAuth " + string.Join(", ", authHeaderParams);

            client.DefaultRequestHeaders.Remove("Authorization");
            client.DefaultRequestHeaders.Add("Authorization", authHeader);
        }
    }
}
