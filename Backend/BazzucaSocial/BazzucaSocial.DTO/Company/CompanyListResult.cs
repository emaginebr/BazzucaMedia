using BazzucaSocial.DTO.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BazzucaSocial.DTO.Company
{
    public class CompanyListResult: StatusResult
    {
        [JsonPropertyName("companies")]
        public IList<CompanyInfo> Companies { get; set; }
    }
}
