using System;

namespace Bazzuca.Infra.Interface
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
