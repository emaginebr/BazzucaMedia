using BazzucaSocial.DTO.Client;
using BazzucaSocial.DTO.SocialNetwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BazzucaSocial.DTO.Post
{
    public class PostInfo
    {
        [JsonPropertyName("postId")]
        public long PostId { get; set; }
        [JsonPropertyName("networkId")]
        public long NetworkId { get; set; }
        [JsonPropertyName("clientId")]
        public long ClientId { get; set; }
        [JsonPropertyName("scheduleDate")]
        public DateTime ScheduleDate { get; set; }
        [JsonPropertyName("postType")]
        public PostTypeEnum PostType { get; set; }
        [JsonPropertyName("s3Key")]
        public string S3Key { get; set; }
        [JsonPropertyName("title")]
        public string Title { get; set; }
        [JsonPropertyName("status")]
        public PostStatusEnum Status { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonPropertyName("socialNetwork")]
        public SocialNetworkInfo SocialNetwork { get; set; }
        [JsonPropertyName("client")]
        public ClientInfo Client { get; set; }
    }
}
