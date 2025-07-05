using BazzucaMedia.DTO.Domain;
using System.Text.Json.Serialization;

namespace BazzucaMedia.DTO.Client
{
    public class ClientResult : StatusResult
    {
        [JsonPropertyName("value")]
        public ClientInfo Value { get; set; }
    }
}
