using BazzucaSocial.Domain.Interfaces.Factory;
using System;
using System.Collections.Generic;

namespace BazzucaSocial.Domain.Interfaces.Models
{
    public interface IClientModel
    {
        long ClientId { get; set; }
        long UserId { get; set; }
        string Name { get; set; }

        IEnumerable<IClientModel> ListByUser(long userId, IClientDomainFactory factory);
        IClientModel GetById(long clientId, IClientDomainFactory factory);
        IClientModel Insert(IClientDomainFactory factory);
        IClientModel Update(IClientDomainFactory factory);
        void Delete(long clientId);
    }
}