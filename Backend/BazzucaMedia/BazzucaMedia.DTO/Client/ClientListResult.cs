using BazzucaMedia.DTO.Domain;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BazzucaMedia.DTO.Client
{
    public class ClientListResult : StatusResult
    {
        [JsonPropertyName("values")]
        public IList<ClientInfo> Values { get; set; }
    }
}
