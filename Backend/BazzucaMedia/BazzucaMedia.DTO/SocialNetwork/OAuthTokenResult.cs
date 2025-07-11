using BazzucaMedia.DTO.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BazzucaMedia.DTO.SocialNetwork
{
    public class OAuthTokenResult: StatusResult
    {
        [JsonPropertyName("token")]
        public OAuthTokenInfo Token {  get; set; }
    }
}
