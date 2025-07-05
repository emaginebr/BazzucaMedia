using System.Collections.Generic;

namespace BazzucaMedia.DTO.Domain
{
    public class StatusResult
    {
        public bool Sucesso { get; set; } = true;
        public string Mensagem { get; set; }
        public IEnumerable<string> Erros { get; set; }
    }
}
