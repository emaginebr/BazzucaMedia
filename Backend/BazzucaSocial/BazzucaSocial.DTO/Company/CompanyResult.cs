using BazzucaSocial.DTO.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BazzucaSocial.DTO.Company
{
    public class CompanyResult: StatusResult
    {
        [JsonPropertyName("company")]
        public CompanyInfo Company { get; set; }
    }
}
