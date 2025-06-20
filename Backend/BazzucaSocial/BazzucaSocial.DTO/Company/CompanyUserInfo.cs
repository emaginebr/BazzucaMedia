using System.Text.Json.Serialization;

namespace BazzucaSocial.DTO.Company
{
    public class CompanyUserInfo
    {
        [JsonPropertyName("cuserId")]
        public long CuserId { get; set; }

        [JsonPropertyName("companyId")]
        public long CompanyId { get; set; }

        [JsonPropertyName("userId")]
        public long UserId { get; set; }

        [JsonPropertyName("level")]
        public int Level { get; set; }
    }
}