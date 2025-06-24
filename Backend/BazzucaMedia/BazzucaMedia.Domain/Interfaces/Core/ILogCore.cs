using System;
using BazzucaMedia.Domain.Impl.Core;
using Microsoft.Extensions.Logging;

namespace BazzucaMedia.Domain.Interfaces.Core
{
    public interface ILogCore
    {
        void Log(string message, Levels level);
    }
}
