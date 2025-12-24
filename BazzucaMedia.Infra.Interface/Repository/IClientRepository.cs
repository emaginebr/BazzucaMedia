using System.Collections.Generic;

namespace BazzucaMedia.Infra.Interface.Repository
{
    public interface IClientRepository<TModel, TFactory>
    {
        TModel Insert(TModel model, TFactory factory);
        TModel Update(TModel model, TFactory factory);
        void Delete(long clientId);
        IEnumerable<TModel> ListByUser(long userId, TFactory factory);
        TModel GetById(long clientId, TFactory factory);
    }
}