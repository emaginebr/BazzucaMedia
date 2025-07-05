using BazzucaMedia.DTO.Domain;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BazzucaMedia.DTO.SocialNetwork
{
    public class SocialNetworkListResult : StatusResult
    {
        [JsonPropertyName("values")]
        public IList<SocialNetworkInfo> Values { get; set; }
    }
}
