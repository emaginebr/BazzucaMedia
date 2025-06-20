using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BazzucaSocial.DTO.Company
{
    public class InviteParam
    {
        [JsonPropertyName("companyId")]
        public long CompanyId { get; set; }
        [JsonPropertyName("profile")]
        public ProfileEnum Profile { get; set; }
        [JsonPropertyName("email")]
        public string Email { get; set; }
    }
}
