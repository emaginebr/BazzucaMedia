using BazzucaSocial.Domain.Interfaces.Models;
using BazzucaSocial.DTO.Client;
using System.Collections.Generic;

namespace BazzucaSocial.Domain.Interfaces.Services
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