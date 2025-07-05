using BazzucaMedia.DTO.Domain;
using System.Text.Json.Serialization;

namespace BazzucaMedia.DTO.Configuration
{
    public class VersionResult : StatusResult
    {
        [JsonPropertyName("version")]
        public string Version { get; set; }
    }
}
