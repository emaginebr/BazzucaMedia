using BazzucaMedia.Domain.Impl.Core;

namespace BazzucaMedia.Domain.Interfaces.Core
{
    public interface ILogCore
    {
        void Log(string message, Levels level);
    }
}
