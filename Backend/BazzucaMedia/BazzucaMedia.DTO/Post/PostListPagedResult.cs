using BazzucaMedia.DTO.Domain;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BazzucaMedia.DTO.Post
{
    public class PostListPagedResult : StatusResult
    {
        [JsonPropertyName("posts")]
        public IList<PostInfo> Posts { get; set; }
        [JsonPropertyName("pageNum")]
        public int PageNum { get; set; }
        [JsonPropertyName("pageCount")]
        public int PageCount { get; set; }
    }
}
