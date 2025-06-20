using System.Collections.Generic;

namespace Core.Domain.Repository
{
    public interface ISocialNetworkRepository<TModel, TFactory>
    {
        TModel Insert(TModel model, TFactory factory);
        TModel Update(TModel model, TFactory factory);
        IEnumerable<TModel> ListByUser(long userId, int take, TFactory factory);
        TModel GetById(long networkId, TFactory factory);
    }
}