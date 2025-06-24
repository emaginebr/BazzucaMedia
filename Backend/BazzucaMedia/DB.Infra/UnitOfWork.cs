using System;
using Core.Domain;
using DB.Infra.Context;
using BazzucaMedia.Domain.Impl.Core;
using BazzucaMedia.Domain.Interfaces.Core;

namespace DB.Infra
{
    public class UnitOfWork : IUnitOfWork
    {

        private readonly BazzucaContext _ccsContext;
        private readonly ILogCore _log;

        public UnitOfWork(ILogCore log, BazzucaContext ccsContext)
        {
            this._ccsContext = ccsContext;
            _log = log;
        }

        public ITransaction BeginTransaction()
        {
            try
            {
                _log.Log("Iniciando bloco de transação.", Levels.Trace);
                return new TransactionDisposable(_log, _ccsContext.Database.BeginTransaction());
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}
