using System.Threading.Tasks;

namespace Bazzuca.Infra.Interface
{
    public interface ICryptoUtils
    {
        bool CheckPersonalSignature(string phrase, string signature, string userAddress);
        Task<string> TesteConnection(string contractAddress);
    }
}
