using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BazzucaMedia.DTO.Post
{
    public class PostSearchParam
    {
        [JsonPropertyName("userId")]
        public long UserId { get; set; }
        [JsonPropertyName("clientId")]
        public long? ClientId { get; set; }
        [JsonPropertyName("status")]
        public PostStatusEnum? Status { get; set; }
        [JsonPropertyName("pageNum")]
        public int PageNum { get; set; }
    }
}
