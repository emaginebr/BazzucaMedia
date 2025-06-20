using Amazon;
using Core.Domain;
using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.Domain.Interfaces.Models;
using BazzucaSocial.Domain.Interfaces.Services;
using BazzucaSocial.DTO.Company;
using NAuth.Client;
using NAuth.DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BazzucaSocial.Domain.Impl.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserClient _userClient;
        private readonly ICompanyDomainFactory _companyFactory;

        public CompanyService(
            IUnitOfWork unitOfWork,
            IUserClient userClient,
            ICompanyDomainFactory companyFactory
        )
        {
            _unitOfWork = unitOfWork;
            _userClient = userClient;
            _companyFactory = companyFactory;
        }
        public CompanyInfo GetCompanyInfo(ICompanyModel md)
        {
            if (md == null)
            {
                return null;
            }
            return new CompanyInfo { 
                CompanyId = md.CompanyId,
                Name = md.Name,
                Plan = md.Plan,
                SlaMin = md.SlaMin,
                Status = md.Status
            };
        }

        public IList<ICompanyModel> ListByUser(long userId, int take)
        {
            return _companyFactory.BuildCompanyModel().ListByUser(userId, take, _companyFactory).ToList();
        }

        public ICompanyModel GetById(long id)
        {
            return _companyFactory.BuildCompanyModel().GetById(id, _companyFactory);
        }

        public ICompanyModel Insert(CompanyInfo info, UserInfo user)
        {
            if (user == null)
            {
                throw new ArgumentException("User not informed");
            }
            if (string.IsNullOrEmpty(info.Name))
            {
                throw new ArgumentException("Name is empty");
            }
            if (info.SlaMin <= 0)
            {
                throw new ArgumentException("Min SLA not informed");
            }
            var model = _companyFactory.BuildCompanyModel();
            model.Name = info.Name;
            model.Plan = PlanEnum.Free;
            model.SlaMin = info.SlaMin;
            model.Status = CompanyStatusEnum.Active;
            model = model.Insert(_companyFactory);

            /*
            var userModel = _userFactory.BuildCompanyUserModel();
            userModel.CompanyId = model.CompanyId;
            userModel.UserId = user.UserId;
            userModel.Profile = ProfileEnum.Owner;
            userModel.Insert(_userFactory);
            */
            return model;
        }

        public ICompanyModel Update(CompanyInfo info)
        {
            if (string.IsNullOrEmpty(info.Name))
            {
                throw new ArgumentException("Name is empty");
            }
            if (info.SlaMin <= 0)
            {
                throw new ArgumentException("Min SLA not informed");
            }
            var model = _companyFactory.BuildCompanyModel().GetById(info.CompanyId, _companyFactory);
            model.Name = info.Name;
            model.SlaMin = info.SlaMin;
            return model.Update(_companyFactory);
        }

        /*
        private void ValidateAccess(long companyId, long userId, ProfileEnum profile)
        {
            var userModel = _userFactory.BuildCompanyUserModel().Get(companyId, userId, _userFactory);
            if (userModel == null && (userModel.Profile == ProfileEnum.User || userModel.Profile == ProfileEnum.Client))
            {
                throw new UnauthorizedAccessException("Not Authorized");
            }
            if (userModel.Profile == ProfileEnum.Manager && profile == ProfileEnum.Owner)
            {
                throw new UnauthorizedAccessException("Not Authorized");
            }
        }

        public ICompanyUserModel GenerateInvite(long companyId, ProfileEnum profile, string email, long managerId)
        {
            ValidateAccess(companyId, managerId, profile);

            var model = _userFactory.BuildCompanyUserModel();
            model.CompanyId = companyId;
            model.Profile = profile;
            model.InviteHash = StringUtils.GenerateShortUniqueString();
            return model.Insert(_userFactory);
        }

        public ICompanyUserModel ChangeProfile(long companyId, long userId, ProfileEnum profile, long managerId)
        {
            ValidateAccess(companyId, managerId, profile);

            var userModel = _userFactory.BuildCompanyUserModel().Get(companyId, userId, _userFactory);
            userModel.Profile = profile;
            return userModel.Update(_userFactory);
        }

        public ICompanyUserModel AcceptInvite(long userId, string inviteHash)
        {
            var userModel = _userFactory.BuildCompanyUserModel().GetByInviteHash(inviteHash, _userFactory);
            if (userModel == null)
            {
                throw new Exception("Invite not found");
            }
            userModel.UserId = userId;
            userModel.InviteHash = string.Empty;
            return userModel.Update(_userFactory);
        }

        public void RemoveUser(long companyId, long userId, long managerId)
        {
            var userModel = _userFactory.BuildCompanyUserModel().Get(companyId, userId, _userFactory);
            if (userModel == null)
            {
                throw new Exception("User not found");
            }
            ValidateAccess(companyId, managerId, userModel.Profile);

            _userFactory.BuildCompanyUserModel().Delete(userModel.CUserId, _userFactory);
        }
        */
    }
}
