using System.Threading.Tasks;

namespace Bazzuca.Infra.Interface
{
    public interface ILinkedinAppService
    {
        Task PublishPost(string username, string password, long clientId,
            string title, string description, string mediaLocalPath, bool headless = true);
    }
}
