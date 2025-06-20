using BazzucaSocial.Domain.Interfaces.Models;
using BazzucaSocial.DTO.Company;
using NAuth.DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BazzucaSocial.Domain.Interfaces.Services
{
    public interface ICompanyService
    {
        CompanyInfo GetCompanyInfo(ICompanyModel md);
        IList<ICompanyModel> ListByUser(long userId, int take);
        ICompanyModel GetById(long id);
        ICompanyModel Insert(CompanyInfo model, UserInfo user);
        ICompanyModel Update(CompanyInfo model);
        /*
        ICompanyUserModel GenerateInvite(long companyId, ProfileEnum profile, string email, long managerId);
        ICompanyUserModel ChangeProfile(long companyId, long userId, ProfileEnum profile, long managerId);
        ICompanyUserModel AcceptInvite(long userId, string inviteHash);
        void RemoveUser(long companyId, long userId, long managerId);
        */

    }
}
