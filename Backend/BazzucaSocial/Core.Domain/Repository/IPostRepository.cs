using System.Collections.Generic;

namespace Core.Domain.Repository
{
    public interface IPostRepository<TModel, TFactory>
    {
        TModel Insert(TModel model, TFactory factory);
        TModel Update(TModel model, TFactory factory);
        IEnumerable<TModel> ListByUser(long userId, TFactory factory);
        TModel GetById(long postId, TFactory factory);
    }
}