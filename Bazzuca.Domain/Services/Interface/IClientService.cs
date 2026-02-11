using Bazzuca.DTO.Client;
using System.Collections.Generic;
using Bazzuca.Domain.Interface.Models;

namespace Bazzuca.Domain.Interface.Services
{
    public interface IClientService
    {
        IEnumerable<IClientModel> ListByUser(long userId);
        IClientModel GetById(long clientId);
        ClientInfo GetClientInfo(IClientModel model);
        IClientModel Insert(ClientInfo client);
        IClientModel Update(ClientInfo client);
        void Delete(long clientId);
    }
}