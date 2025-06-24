using BazzucaMedia.DTO.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BazzucaMedia.DTO.Post
{
    public class PostResult: StatusResult
    {
        [JsonPropertyName("value")]
        public PostInfo Value { get; set; }
    }
}
