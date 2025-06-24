using BazzucaMedia.Domain.Interfaces.Models;
using BazzucaMedia.DTO.Client;
using System.Collections.Generic;

namespace BazzucaMedia.Domain.Interfaces.Services
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