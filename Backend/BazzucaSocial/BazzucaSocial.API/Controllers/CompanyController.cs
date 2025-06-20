using BazzucaSocial.Domain.Impl.Services;
using BazzucaSocial.Domain.Interfaces.Services;
using BazzucaSocial.DTO.Company;
using BazzucaSocial.DTO.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NAuth.Client;
using NAuth.DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BazzucaSocial.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CompanyController: ControllerBase
    {
        private readonly IUserClient _userClient;
        private readonly ICompanyService _companyService;

        public CompanyController(IUserClient userClient, ICompanyService companyService)
        {
            _userClient = userClient;
            _companyService = companyService;
        }

        [HttpGet("listByUser/{userId}/{take}")]
        [Authorize]
        public ActionResult<CompanyListResult> ListByUser(long userId, int take)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var companies = _companyService.ListByUser(userId, take);

                return new CompanyListResult()
                {
                    Companies = companies.Select(x => _companyService.GetCompanyInfo(x)).ToList()
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getById/{companyId}")]
        [Authorize]
        public ActionResult<CompanyResult> GetById(long companyId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var company = _companyService.GetById(companyId);
                if (company == null)
                {
                    return new CompanyResult() { Company = null, Sucesso = false, Mensagem = "Company Not Found" };
                }

                return new CompanyResult()
                {
                    Company = _companyService.GetCompanyInfo(company)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("insert")]
        [Authorize]
        public ActionResult<CompanyResult> Insert([FromBody] CompanyInfo company)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var companyReturn = _companyService.Insert(company, userSession);

                return new CompanyResult()
                {
                    Company = _companyService.GetCompanyInfo(companyReturn)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("update")]
        [Authorize]
        public ActionResult<CompanyResult> Update([FromBody] CompanyInfo company)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var companyReturn = _companyService.Update(company);

                return new CompanyResult()
                {
                    Company = _companyService.GetCompanyInfo(companyReturn)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /*
        [HttpPost("generateInvite")]
        [Authorize]
        public ActionResult<StringResult> GenerateInvite([FromBody] InviteParam param)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var userModel = _companyService.GenerateInvite(param.CompanyId, param.Profile, param.Email, userSession.UserId);

                return new StringResult()
                {
                    Value = userModel.InviteHash
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("changeProfile/{companyId}/{userId}/{profile}")]
        [Authorize]
        public ActionResult<StatusResult> ChangeProfile(long companyId, long userId, int profile)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var userModel = _companyService.ChangeProfile(companyId, userId, (ProfileEnum) profile, userSession.UserId);

                return new StatusResult()
                {
                    Sucesso = true,
                    Mensagem = "Profile changed successfully"
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("acceptInvite/{inviteHash}")]
        [Authorize]
        public ActionResult<StatusResult> AcceptInvite(string inviteHash)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var userModel = _companyService.AcceptInvite(userSession.UserId, inviteHash);

                return new StatusResult()
                {
                    Sucesso = true,
                    Mensagem = "Invite accepted"
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("removeUser/{companyId}/{userId}")]
        [Authorize]
        public ActionResult<StatusResult> RemoveUser(long companyId, long userId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                _companyService.RemoveUser(companyId, userId, userSession.UserId);

                return new StatusResult()
                {
                    Sucesso = true,
                    Mensagem = "User removed successfully"
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        */
    }
}
