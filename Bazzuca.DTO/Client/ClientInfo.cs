using Bazzuca.DTO.SocialNetwork;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Bazzuca.DTO.Client
{
    public class ClientInfo
    {
        [JsonPropertyName("clientId")]
        public long ClientId { get; set; }
        [JsonPropertyName("userId")]
        public long UserId { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("socialNetworks")]
        public IList<SocialNetworkEnum> SocialNetworks { get; set; }
    }
}
