using BazzucaMedia.DTO.Domain;
using System.Text.Json.Serialization;

namespace BazzucaMedia.DTO.Post
{
    public class PostResult : StatusResult
    {
        [JsonPropertyName("value")]
        public PostInfo Value { get; set; }
    }
}
