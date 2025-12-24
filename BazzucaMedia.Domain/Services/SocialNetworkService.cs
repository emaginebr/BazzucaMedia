using BazzucaMedia.DTO.SocialNetwork;
using System;
using System.Collections.Generic;
using System.Linq;
using BazzucaMedia.Infra.Interface;
using BazzucaMedia.Domain.Interface.Factory;
using BazzucaMedia.Domain.Interface.Models;
using BazzucaMedia.Domain.Interface.Services;

namespace BazzucaMedia.Domain.Interface
{
    public class SocialNetworkService : ISocialNetworkService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISocialNetworkDomainFactory _factory;

        public SocialNetworkService(
            IUnitOfWork unitOfWork,
            ISocialNetworkDomainFactory factory
        )
        {
            _unitOfWork = unitOfWork;
            _factory = factory;
        }

        public IList<ISocialNetworkModel> ListByClient(long clientId)
        {
            return _factory.BuildSocialNetworkModel().ListByClient(clientId, _factory).ToList();
        }

        public ISocialNetworkModel GetById(long id)
        {
            return _factory.BuildSocialNetworkModel().GetById(id, _factory);
        }

        public SocialNetworkInfo GetNetworkInfo(ISocialNetworkModel model)
        {
            if (model == null)
            {
                return null;
            }
            return new SocialNetworkInfo
            {
                NetworkId = model.NetworkId,
                Network = model.Network,
                ClientId = model.ClientId,
                Url = model.Url,
                User = model.User,
                Password = model.Password
            };
        }

        public ISocialNetworkModel Insert(SocialNetworkInfo network)
        {
            if (network == null)
            {
                throw new ArgumentException("Model not informed");
            }
            var model = _factory.BuildSocialNetworkModel();

            model.NetworkId = network.NetworkId;
            model.Network = network.Network;
            model.ClientId = network.ClientId;
            model.Url = network.Url;
            model.User = network.User;
            model.Password = network.Password;

            return model.Insert(_factory);
        }

        public ISocialNetworkModel Update(SocialNetworkInfo network)
        {
            if (network == null)
            {
                throw new ArgumentException("Model not informed");
            }
            var model = _factory.BuildSocialNetworkModel();

            model.NetworkId = network.NetworkId;
            model.Network = network.Network;
            model.ClientId = network.ClientId;
            model.Url = network.Url;
            model.User = network.User;
            model.Password = network.Password;

            return model.Update(_factory);
        }

        public void Delete(long networkId)
        {
            _factory.BuildSocialNetworkModel().Delete(networkId);
        }
    }
}