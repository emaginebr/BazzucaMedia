using BazzucaMedia.DTO.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BazzucaMedia.DTO.SocialNetwork
{
    public class SocialNetworkResult: StatusResult
    {
        [JsonPropertyName("value")]
        public SocialNetworkInfo Value {  get; set; }
    }
}
