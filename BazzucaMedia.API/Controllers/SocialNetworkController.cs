using BazzucaMedia.DTO.SocialNetwork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using NAuth.ACL.Interfaces;
using BazzucaMedia.Domain.Interface.Services;

namespace BazzucaMedia.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SocialNetworkController : ControllerBase
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
        public ActionResult<IEnumerable<SocialNetworkInfo>> ListByClient(long clientId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                var networks = _networkService.ListByClient(clientId);

                return Ok(networks.Select(x => _networkService.GetNetworkInfo(x)).ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getById/{networkId}")]
        [Authorize]
        public ActionResult<SocialNetworkInfo> GetById(long networkId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                var network = _networkService.GetById(networkId);
                if (network == null)
                {
                    return NotFound("Social network Not Found");
                }

                return Ok(_networkService.GetNetworkInfo(network));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("insert")]
        [Authorize]
        public ActionResult<SocialNetworkInfo> Insert([FromBody] SocialNetworkInfo network)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                var networkReturn = _networkService.Insert(network);

                return Ok(_networkService.GetNetworkInfo(networkReturn));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("update")]
        [Authorize]
        public ActionResult<SocialNetworkInfo> Update([FromBody] SocialNetworkInfo network)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                var networkReturn = _networkService.Update(network);

                return Ok(_networkService.GetNetworkInfo(networkReturn));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("delete/{networkId}")]
        [Authorize]
        public ActionResult Delete(long networkId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                _networkService.Delete(networkId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
