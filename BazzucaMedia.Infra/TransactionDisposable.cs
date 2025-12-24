using BazzucaMedia.Infra.Interface;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;

namespace BazzucaMedia.Infra
{
    public class TransactionDisposable : ITransaction
    {
        private readonly ILogger _log;
        private readonly IDbContextTransaction _transaction;

        public TransactionDisposable(ILogger log, IDbContextTransaction transaction)
        {
            _log = log;
            _transaction = transaction;
        }

        public void Commit()
        {
            _log.LogTrace("Finalizando bloco de transação.");
            _transaction.Commit();
        }

        public void Dispose()
        {
            _log.LogTrace("Liberando transação da memória.");
            _transaction.Dispose();
        }

        public void Rollback()
        {
            _log.LogTrace("Rollback do bloco de transação.");
            _transaction.Rollback();

        }
    }
}
