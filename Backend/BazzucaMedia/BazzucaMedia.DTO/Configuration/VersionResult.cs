using System;
using System.Text.Json.Serialization;
using BazzucaMedia.DTO.Domain;

namespace BazzucaMedia.DTO.Configuration
{
    public class VersionResult : StatusResult
    {
        [JsonPropertyName("version")]
        public string Version { get; set; }
    }
}
