using BazzucaSocial.Domain.Impl.Services;
using BazzucaSocial.Domain.Interfaces.Services;
using BazzucaSocial.DTO.Domain;
using BazzucaSocial.DTO.SocialNetwork;
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
    public class SocialNetworkController: ControllerBase
    {
        private readonly IUserClient _userClient;
        private readonly ISocialNetworkService _networkService;

        public SocialNetworkController(IUserClient userClient, ISocialNetworkService networkService)
        {
            _userClient = userClient;
            _networkService = networkService;
        }

        [HttpGet("listByClient/{clientId}")]
        [Authorize]
        public ActionResult<SocialNetworkListResult> ListByClient(long clientId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var companies = _networkService.ListByClient(clientId);

                return new SocialNetworkListResult()
                {
                    Values = companies.Select(x => _networkService.GetNetworkInfo(x)).ToList()
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getById/{networkId}")]
        [Authorize]
        public ActionResult<SocialNetworkResult> GetById(long networkId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var network = _networkService.GetById(networkId);
                if (network == null)
                {
                    return new SocialNetworkResult { Value = null, Sucesso = false, Mensagem = "Social network Not Found" };
                }

                return new SocialNetworkResult()
                {
                    Value = _networkService.GetNetworkInfo(network)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("insert")]
        [Authorize]
        public ActionResult<SocialNetworkResult> Insert([FromBody] SocialNetworkInfo network)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var networkReturn = _networkService.Insert(network);

                return new SocialNetworkResult
                {
                    Value = _networkService.GetNetworkInfo(networkReturn)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("update")]
        [Authorize]
        public ActionResult<SocialNetworkResult> Update([FromBody] SocialNetworkInfo network)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var networkReturn = _networkService.Update(network);

                return new SocialNetworkResult
                {
                    Value = _networkService.GetNetworkInfo(networkReturn)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("delete/{networkId}")]
        [Authorize]
        public ActionResult<StatusResult> Delete(long networkId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                _networkService.Delete(networkId);

                return new StatusResult
                {
                    Sucesso = true
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
