using BazzucaSocial.Domain.Interfaces.Models;
using BazzucaSocial.DTO.SocialNetwork;
using System.Collections.Generic;

namespace BazzucaSocial.Domain.Interfaces.Services
{
    public interface ISocialNetworkService
    {
        IList<ISocialNetworkModel> ListByClient(long clientId);
        ISocialNetworkModel GetById(long id);
        SocialNetworkInfo GetNetworkInfo(ISocialNetworkModel model);
        ISocialNetworkModel Insert(SocialNetworkInfo network);
        ISocialNetworkModel Update(SocialNetworkInfo network);
        void Delete(long networkId);
    }
}