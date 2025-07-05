using BazzucaMedia.DTO.Domain;
using System.Text.Json.Serialization;

namespace BazzucaMedia.DTO.SocialNetwork
{
    public class SocialNetworkResult : StatusResult
    {
        [JsonPropertyName("value")]
        public SocialNetworkInfo Value { get; set; }
    }
}
