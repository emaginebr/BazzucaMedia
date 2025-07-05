using BazzucaMedia.DTO.Domain;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BazzucaMedia.DTO.Post
{
    public class PostListResult : StatusResult
    {
        [JsonPropertyName("values")]
        public IList<PostInfo> Values { get; set; }
    }
}
