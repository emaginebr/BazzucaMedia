using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Bazzuca.DTO.SocialNetwork
{
    public class OAuthTokenInfo
    {
        [JsonPropertyName("oauthToken")]
        public string OAuthToken { get; set; }
        [JsonPropertyName("oauthSecret")]
        public string OauthSecret { get; set; }
    }
}
