using BazzucaSocial.Domain.Interfaces.Models;
using System.Collections.Generic;

namespace BazzucaSocial.Domain.Interfaces.Services
{
    public interface ISocialNetworkService
    {
        IList<ISocialNetworkModel> ListByUser(long userId, int take);
        ISocialNetworkModel GetById(long id);
        ISocialNetworkModel Insert(ISocialNetworkModel model);
        ISocialNetworkModel Update(ISocialNetworkModel model);
    }
}