using BazzucaMedia.DTO.Client;
using System;
using System.Collections.Generic;
using BazzucaMedia.Infra.Interface;
using BazzucaMedia.Domain.Interface.Factory;
using BazzucaMedia.Domain.Interface.Models;
using BazzucaMedia.Domain.Interface.Services;

namespace BazzucaMedia.Domain.Interface
{
    public class ClientService : IClientService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IClientDomainFactory _clientFactory;
        private readonly ISocialNetworkDomainFactory _networkFactory;

        public ClientService(
            IUnitOfWork unitOfWork,
            IClientDomainFactory clientFactory,
            ISocialNetworkDomainFactory networkFactory
        )
        {
            _unitOfWork = unitOfWork;
            _clientFactory = clientFactory;
            _networkFactory = networkFactory;
        }

        public IEnumerable<IClientModel> ListByUser(long userId)
        {
            return _clientFactory.BuildClientModel().ListByUser(userId, _clientFactory);
        }

        public IClientModel GetById(long clientId)
        {
            return _clientFactory.BuildClientModel().GetById(clientId, _clientFactory);
        }
        public ClientInfo GetClientInfo(IClientModel model)
        {
            if (model == null)
            {
                return null;
            }
            return new ClientInfo
            {
                ClientId = model.ClientId,
                UserId = model.UserId,
                Name = model.Name,
                SocialNetworks = model.GetSocialNetworks(_networkFactory)
            };
        }

        public IClientModel Insert(ClientInfo client)
        {
            if (client == null)
            {
                throw new ArgumentException("Client não informado");
            }
            var model = _clientFactory.BuildClientModel();
            model.ClientId = client.ClientId;
            model.UserId = client.UserId;
            model.Name = client.Name;

            return model.Insert(_clientFactory);
        }

        public IClientModel Update(ClientInfo client)
        {
            if (client == null)
            {
                throw new ArgumentException("Client não informado");
            }
            var model = _clientFactory
                .BuildClientModel()
                .GetById(client.ClientId, _clientFactory);
            model.Name = client.Name;

            return model.Update(_clientFactory);
        }

        public void Delete(long clientId)
        {
            _clientFactory.BuildClientModel().Delete(clientId);
        }
    }
}