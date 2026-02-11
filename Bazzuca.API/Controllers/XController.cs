using Bazzuca.DTO.SocialNetwork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using NAuth.ACL.Interfaces;
using Bazzuca.Domain.Interface.Services;

namespace Bazzuca.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class XController : ControllerBase
    {
        private readonly IUserClient _userClient;
        private readonly ISocialNetworkService _networkService;
        private readonly IXTokenService _tokenService;

        public XController(
            IUserClient userClient, 
            ISocialNetworkService networkService,
            IXTokenService tokenService
        )
        {
            _userClient = userClient;
            _networkService = networkService;
            _tokenService = tokenService;
        }

        [HttpGet("getRequestToken")]
        [Authorize]
        public async Task<ActionResult<OAuthTokenInfo>> GetRequestToken()
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                var token = await _tokenService.GetRequestTokenAsync();

                return Ok(token);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
