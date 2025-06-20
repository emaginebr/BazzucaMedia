using System.Text.Json.Serialization;

namespace BazzucaSocial.DTO.Company
{
    public class CompanyPriorityInfo
    {
        [JsonPropertyName("priorityId")]
        public long PriorityId { get; set; }

        [JsonPropertyName("companyId")]
        public long CompanyId { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("level")]
        public int Level { get; set; }

        [JsonPropertyName("status")]
        public int Status { get; set; }
    }
}