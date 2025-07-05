using BazzucaMedia.DTO.SocialNetwork;
using System.Text.Json.Serialization;

namespace BazzucaMedia.DTO.Post
{
    public class PostSearchParam
    {
        [JsonPropertyName("userId")]
        public long UserId { get; set; }
        [JsonPropertyName("clientId")]
        public long? ClientId { get; set; }
        [JsonPropertyName("network")]
        public SocialNetworkEnum? Network { get; set; }
        [JsonPropertyName("status")]
        public PostStatusEnum? Status { get; set; }
        [JsonPropertyName("pageNum")]
        public int PageNum { get; set; }
    }
}
