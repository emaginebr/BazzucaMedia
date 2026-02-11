using System.Text.Json.Serialization;

namespace Bazzuca.DTO.SocialNetwork
{
    public class SocialNetworkInfo
    {
        [JsonPropertyName("networkId")]
        public long NetworkId { get; set; }
        [JsonPropertyName("clientId")]
        public long ClientId { get; set; }
        [JsonPropertyName("network")]
        public SocialNetworkEnum Network { get; set; }
        [JsonPropertyName("url")]
        public string Url { get; set; }
        [JsonPropertyName("user")]
        public string User { get; set; }
        [JsonPropertyName("password")]
        public string Password { get; set; }
    }
}
