using System.Text.Json.Serialization;

namespace BazzucaSocial.DTO.Company
{
    public class CompanyTagInfo
    {
        [JsonPropertyName("tagId")]
        public long TagId { get; set; }

        [JsonPropertyName("companyId")]
        public long CompanyId { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("status")]
        public int Status { get; set; }
    }
}