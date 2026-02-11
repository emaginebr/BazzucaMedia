using Bazzuca.Infra.Context;
using System;
using Bazzuca.Infra.Interface;
using Microsoft.Extensions.Logging;

namespace Bazzuca.Infra
{
    public class UnitOfWork : IUnitOfWork
    {

        private readonly BazzucaContext _ccsContext;
        private readonly ILogger<UnitOfWork> _log;

        public UnitOfWork(ILogger<UnitOfWork> log, BazzucaContext ccsContext)
        {
            this._ccsContext = ccsContext;
            _log = log;
        }

        public ITransaction BeginTransaction()
        {
            try
            {
                _log.LogTrace("Iniciando bloco de transação.");
                return new TransactionDisposable(_log, _ccsContext.Database.BeginTransaction());
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
