using System.Text.Json.Serialization;

namespace BazzucaMedia.DTO.Domain
{
    public class NumberResult : StatusResult
    {
        [JsonPropertyName("value")]
        public double Value { get; set; }
    }
}
