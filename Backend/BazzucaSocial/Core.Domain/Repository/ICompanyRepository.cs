using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domain.Repository
{
    public interface ICompanyRepository<TModel, TFactory>
    {
        TModel Insert(TModel model, TFactory factory);
        TModel Update(TModel model, TFactory factory);
        IEnumerable<TModel> ListByUser(long userId, int take, TFactory factory);
        TModel GetById(long companyId, TFactory factory);
    }
}
