using Core.Domain.Repository;
using DB.Infra.Context;
using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.Domain.Interfaces.Models;
using System.Collections.Generic;
using System.Linq;

namespace DB.Infra.Repository
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
            model.UserId = row.UserId;
            model.NetworkKey = row.NetworkKey;
            model.Url = row.Url;
            model.User = row.User;
            model.Password = row.Password;
            return model;
        }

        private void ModelToDb(ISocialNetworkModel model, SocialNetwork row)
        {
            row.NetworkId = model.NetworkId;
            row.UserId = model.UserId;
            row.NetworkKey = model.NetworkKey;
            row.Url = model.Url;
            row.User = model.User;
            row.Password = model.Password;
        }

        public IEnumerable<ISocialNetworkModel> ListByUser(long userId, int take, ISocialNetworkDomainFactory factory)
        {
            var rows = _context.SocialNetworks
                .Where(x => x.UserId == userId)
                .OrderBy(x => x.NetworkKey)
                .Take(take)
                .ToList();
            return rows.Select(x => DbToModel(factory, x));
        }

        public ISocialNetworkModel GetById(long networkId, ISocialNetworkDomainFactory factory)
        {
            var row = _context.SocialNetworks.Find(networkId);
            return row == null ? null : DbToModel(factory, row);
        }

        public ISocialNetworkModel Insert(ISocialNetworkModel model, ISocialNetworkDomainFactory factory)
        {
            var entity = new SocialNetwork();
            ModelToDb(model, entity);
            _context.Add(entity);
            _context.SaveChanges();
            model.NetworkId = entity.NetworkId;
            return model;
        }

        public ISocialNetworkModel Update(ISocialNetworkModel model, ISocialNetworkDomainFactory factory)
        {
            var row = _context.SocialNetworks.FirstOrDefault(x => x.NetworkId == model.NetworkId);
            ModelToDb(model, row);
            _context.SocialNetworks.Update(row);
            _context.SaveChanges();
            return model;
        }
    }
}