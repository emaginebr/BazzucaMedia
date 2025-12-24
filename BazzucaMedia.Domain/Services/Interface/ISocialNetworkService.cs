using BazzucaMedia.DTO.SocialNetwork;
using System.Collections.Generic;
using BazzucaMedia.Domain.Interface.Models;

namespace BazzucaMedia.Domain.Interface.Services
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