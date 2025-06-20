using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BazzucaSocial.DTO.Company
{
    public class CompanyInfo
    {
        [JsonPropertyName("companyId")]
        public long CompanyId { get; set; }
        [JsonPropertyName("userId")]
        public long UserId { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("slaMin")]
        public int SlaMin { get; set; }
        [JsonPropertyName("plan")]
        public PlanEnum Plan { get; set; }
        [JsonPropertyName("status")]
        public CompanyStatusEnum Status { get; set; }
    }
}
