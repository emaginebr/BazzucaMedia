using System;

namespace BazzucaMedia.Infra.Interface
{
    public interface IUnitOfWork
    {
        ITransaction BeginTransaction();
    }
    public interface ITransaction : IDisposable
    {
        void Commit();
        void Rollback();
    }
}
