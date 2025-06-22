using System.Collections.Generic;

namespace Core.Domain.Repository
{
    public interface ISocialNetworkRepository<TModel, TFactory>
    {
        IEnumerable<TModel> ListByClient(long clientId, TFactory factory);
        TModel GetById(long networkId, TFactory factory);
        TModel Insert(TModel model, TFactory factory);
        TModel Update(TModel model, TFactory factory);
        void Delete(long networkId);
    }
}