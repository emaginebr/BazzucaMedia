using Core.Domain;
using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.Domain.Interfaces.Models;
using BazzucaSocial.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BazzucaSocial.Domain.Impl.Services
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

        public IList<ISocialNetworkModel> ListByUser(long userId, int take)
        {
            return _factory.BuildSocialNetworkModel().ListByUser(userId, take, _factory).ToList();
        }

        public ISocialNetworkModel GetById(long id)
        {
            return _factory.BuildSocialNetworkModel().GetById(id, _factory);
        }

        public ISocialNetworkModel Insert(ISocialNetworkModel model)
        {
            if (model == null)
                throw new ArgumentException("Model not informed");
            return model.Insert(_factory);
        }

        public ISocialNetworkModel Update(ISocialNetworkModel model)
        {
            if (model == null)
                throw new ArgumentException("Model not informed");
            return model.Update(_factory);
        }
    }
}