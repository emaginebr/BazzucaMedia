using BazzucaMedia.Domain.Interfaces.Services;
using BazzucaMedia.DTO.Client;
using BazzucaMedia.DTO.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NAuth.ACL;
using System;
using System.Linq;

namespace BazzucaMedia.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IUserClient _userClient;
        private readonly IClientService _clientService;

        public ClientController(IUserClient userClient, IClientService clientService)
        {
            _userClient = userClient;
            _clientService = clientService;
        }

        [HttpGet("listByUser")]
        [Authorize]
        public ActionResult<ClientListResult> ListByUser()
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var posts = _clientService.ListByUser(userSession.UserId);

                return new ClientListResult
                {
                    Values = posts.Select(x => _clientService.GetClientInfo(x)).ToList()
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getById/{clientId}")]
        [Authorize]
        public ActionResult<ClientResult> GetById(long clientId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var post = _clientService.GetById(clientId);
                if (post == null)
                {
                    return new ClientResult { Value = null, Sucesso = false, Mensagem = "Post Not Found" };
                }

                return new ClientResult()
                {
                    Value = _clientService.GetClientInfo(post)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("insert")]
        [Authorize]
        public ActionResult<ClientResult> Insert([FromBody] ClientInfo client)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                client.UserId = userSession.UserId;
                var ClientModel = _clientService.Insert(client);

                return new ClientResult
                {
                    Value = _clientService.GetClientInfo(ClientModel)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("update")]
        [Authorize]
        public ActionResult<ClientResult> Update([FromBody] ClientInfo client)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                client.UserId = userSession.UserId;
                var clientModel = _clientService.Update(client);

                return new ClientResult
                {
                    Value = _clientService.GetClientInfo(clientModel)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("delete/{clientId}")]
        [Authorize]
        public ActionResult<StatusResult> Delete(long clientId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                _clientService.Delete(clientId);

                return new StatusResult
                {
                    Sucesso = true,
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
