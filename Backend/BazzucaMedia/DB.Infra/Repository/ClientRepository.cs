using Core.Domain.Repository;
using DB.Infra.Context;
using BazzucaMedia.Domain.Interfaces.Factory;
using BazzucaMedia.Domain.Interfaces.Models;
using System.Collections.Generic;
using System.Linq;

namespace DB.Infra.Repository
{
    public class ClientRepository : IClientRepository<IClientModel, IClientDomainFactory>
    {
        private readonly BazzucaContext _context;

        public ClientRepository(BazzucaContext context)
        {
            _context = context;
        }

        private IClientModel DbToModel(IClientDomainFactory factory, Client row)
        {
            var model = factory.BuildClientModel();
            model.ClientId = row.ClientId;
            model.UserId = row.UserId;
            model.Name = row.Name;
            return model;
        }

        private void ModelToDb(IClientModel model, Client row)
        {
            row.ClientId = model.ClientId;
            row.UserId = model.UserId;
            row.Name = model.Name;
        }

        public IEnumerable<IClientModel> ListByUser(long userId, IClientDomainFactory factory)
        {
            var rows = _context.Clients
                .Where(x => x.UserId == userId && x.Active)
                .OrderBy(x => x.Name)
                .ToList();
            return rows.Select(x => DbToModel(factory, x));
        }

        public IClientModel GetById(long clientId, IClientDomainFactory factory)
        {
            var row = _context.Clients.Find(clientId);
            if (row == null || !row.Active)
            {
                return null;
            }
            return row == null ? null : DbToModel(factory, row);
        }

        public IClientModel Insert(IClientModel model, IClientDomainFactory factory)
        {
            var entity = new Client();
            ModelToDb(model, entity);
            entity.Active = true;
            _context.Add(entity);
            _context.SaveChanges();
            model.ClientId = entity.ClientId;
            return model;
        }

        public IClientModel Update(IClientModel model, IClientDomainFactory factory)
        {
            var row = _context.Clients.FirstOrDefault(x => x.ClientId == model.ClientId);
            if (row == null || !row.Active)
            {
                throw new KeyNotFoundException($"Client with ID {model.ClientId} not found.");
            }
            ModelToDb(model, row);
            _context.Clients.Update(row);
            _context.SaveChanges();
            return model;
        }

        public void Delete(long clientId)
        {
            var row = _context.Clients.Find(clientId);
            if (row == null || !row.Active)
            {
                throw new KeyNotFoundException($"Client with ID {clientId} not found.");
            }
            row.Active = false; // Soft delete
            _context.Clients.Update(row);
            _context.SaveChanges();
        }
    }
}