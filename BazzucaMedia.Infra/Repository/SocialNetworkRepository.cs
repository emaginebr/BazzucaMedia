using BazzucaMedia.DTO.SocialNetwork;
using BazzucaMedia.Infra.Context;
using System.Collections.Generic;
using System.Linq;
using BazzucaMedia.Infra.Interface.Repository;
using BazzucaMedia.Domain.Interface.Factory;
using BazzucaMedia.Domain.Interface.Models;

namespace BazzucaMedia.Infra.Repository
{
    public class SocialNetworkRepository : ISocialNetworkRepository<ISocialNetworkModel, ISocialNetworkDomainFactory>
    {
        private readonly BazzucaContext _context;

        public SocialNetworkRepository(BazzucaContext context)
        {
            _context = context;
        }

        private ISocialNetworkModel DbToModel(ISocialNetworkDomainFactory factory, SocialNetwork row)
        {
            var model = factory.BuildSocialNetworkModel();
            model.NetworkId = row.NetworkId;
            model.ClientId = row.ClientId;
            model.Network = (SocialNetworkEnum)row.NetworkKey;
            model.Url = row.Url;
            model.User = row.User;
            model.Password = row.Password;
            model.AccessToken = row.AccessToken;
            model.AccessSecret = row.AccessSecret;
            return model;
        }

        private void ModelToDb(ISocialNetworkModel model, SocialNetwork row)
        {
            row.NetworkId = model.NetworkId;
            row.ClientId = model.ClientId;
            row.NetworkKey = (int)model.Network;
            row.Url = model.Url;
            row.User = model.User;
            row.Password = model.Password;
            row.AccessToken = model.AccessToken;
            row.AccessSecret = model.AccessSecret;
        }

        public IEnumerable<ISocialNetworkModel> ListByClient(long clientId, ISocialNetworkDomainFactory factory)
        {
            var rows = _context.SocialNetworks
                .Where(x => x.ClientId == clientId && x.Active)
                .OrderBy(x => x.NetworkKey)
                .ToList();
            return rows.Select(x => DbToModel(factory, x));
        }

        public ISocialNetworkModel GetById(long networkId, ISocialNetworkDomainFactory factory)
        {
            var row = _context.SocialNetworks.Find(networkId);
            if (row == null || !row.Active)
            {
                return null;
            }
            return row == null ? null : DbToModel(factory, row);
        }

        public ISocialNetworkModel Insert(ISocialNetworkModel model, ISocialNetworkDomainFactory factory)
        {
            var entity = new SocialNetwork();
            ModelToDb(model, entity);
            entity.Active = true; // Assuming new entities are active by default
            _context.Add(entity);
            _context.SaveChanges();
            model.NetworkId = entity.NetworkId;
            return model;
        }

        public ISocialNetworkModel Update(ISocialNetworkModel model, ISocialNetworkDomainFactory factory)
        {
            var row = _context.SocialNetworks.FirstOrDefault(x => x.NetworkId == model.NetworkId);
            if (row == null || !row.Active)
            {
                throw new KeyNotFoundException($"Social Network with ID {model.NetworkId} not found.");
            }
            ModelToDb(model, row);
            _context.SocialNetworks.Update(row);
            _context.SaveChanges();
            return model;
        }

        public void Delete(long networkId)
        {
            var row = _context.SocialNetworks.Find(networkId);
            if (row == null || !row.Active)
            {
                throw new KeyNotFoundException($"Social Network with ID {networkId} not found.");
            }
            row.Active = false; // Soft delete by marking as inactive
            _context.SocialNetworks.Update(row);
            _context.SaveChanges();
        }
    }
}