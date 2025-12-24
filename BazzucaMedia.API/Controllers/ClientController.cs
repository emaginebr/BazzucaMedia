using BazzucaMedia.DTO.Client;
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
        public ActionResult<IEnumerable<ClientInfo>> ListByUser()
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                var clients = _clientService.ListByUser(userSession.UserId);

                return Ok(clients.Select(x => _clientService.GetClientInfo(x)).ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getById/{clientId}")]
        [Authorize]
        public ActionResult<ClientInfo> GetById(long clientId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                var client = _clientService.GetById(clientId);
                if (client == null)
                {
                    return NotFound("Client Not Found");
                }

                return Ok(_clientService.GetClientInfo(client));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("insert")]
        [Authorize]
        public ActionResult<ClientInfo> Insert([FromBody] ClientInfo client)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                client.UserId = userSession.UserId;
                var clientModel = _clientService.Insert(client);

                return Ok(_clientService.GetClientInfo(clientModel));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("update")]
        [Authorize]
        public ActionResult<ClientInfo> Update([FromBody] ClientInfo client)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                client.UserId = userSession.UserId;
                var clientModel = _clientService.Update(client);

                return Ok(_clientService.GetClientInfo(clientModel));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("delete/{clientId}")]
        [Authorize]
        public ActionResult Delete(long clientId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                _clientService.Delete(clientId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
