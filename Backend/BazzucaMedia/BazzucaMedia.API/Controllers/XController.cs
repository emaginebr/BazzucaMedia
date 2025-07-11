using BazzucaMedia.Domain.Interfaces.Services;
using BazzucaMedia.DTO.SocialNetwork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NAuth.Client;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BazzucaMedia.API.Controllers
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
        public async Task<ActionResult<OAuthTokenResult>> GetRequestToken()
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var token = await _tokenService.GetRequestTokenAsync();

                return new OAuthTokenResult
                {
                    Token = token
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
