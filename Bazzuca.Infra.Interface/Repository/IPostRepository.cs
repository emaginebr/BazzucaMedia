using System;
using System.Collections.Generic;

namespace Bazzuca.Infra.Interface.Repository
{
    public interface IPostRepository<TModel, TFactory>
    {
        TModel GetById(long postId, TFactory factory);
        TModel GetByScheduleDate(long userId, DateTime scheduleDate, TFactory factory);
        TModel Insert(TModel model, TFactory factory);
        TModel Update(TModel model, TFactory factory);
        IEnumerable<TModel> ListByUser(long userId, DateTime ini, DateTime end, TFactory factory);
        IEnumerable<TModel> Search(long userId, long? clientId, int? network, int? status, int pageNum, out int pageCount, TFactory factory);
    }
}