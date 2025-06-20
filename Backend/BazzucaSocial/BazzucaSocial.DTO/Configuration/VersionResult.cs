using System;
using System.Text.Json.Serialization;
using BazzucaSocial.DTO.Domain;

namespace BazzucaSocial.DTO.Configuration
{
    public class VersionResult : StatusResult
    {
        [JsonPropertyName("version")]
        public string Version { get; set; }
    }
}
