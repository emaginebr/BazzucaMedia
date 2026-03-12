using Bazzuca.Application.Interfaces;
using Bazzuca.DTO.Post;
using Bazzuca.DTO.SocialNetwork;
using Bazzuca.Infra.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NAuth.ACL.Interfaces;
using Bazzuca.Domain.Interface.Services;

namespace Bazzuca.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IUserClient _userClient;
        private readonly IPostService _postService;
        private readonly IRabbitAppService _rabbitAppService;
        private readonly ITenantContext _tenantContext;
        private readonly IConfiguration _configuration;

        public PostController(
            IUserClient userClient,
            IPostService postService,
            IRabbitAppService rabbitAppService,
            ITenantContext tenantContext,
            IConfiguration configuration)
        {
            _userClient = userClient;
            _postService = postService;
            _rabbitAppService = rabbitAppService;
            _tenantContext = tenantContext;
            _configuration = configuration;
        }

        [HttpGet("listByUser/{month}/{year}")]
        [Authorize]
        public ActionResult<IEnumerable<PostInfo>> ListByUser(int month, int year)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                var posts = _postService.ListByUser(userSession.UserId, month, year);

                return Ok(posts.Select(x => _postService.GetPostInfo(x)).ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getById/{postId}")]
        [Authorize]
        public ActionResult<PostInfo> GetById(long postId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                var post = _postService.GetById(postId);
                if (post == null)
                {
                    return NotFound("Post Not Found");
                }

                return Ok(_postService.GetPostInfo(post));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("insert")]
        [Authorize]
        public ActionResult<PostInfo> Insert([FromBody] PostInfo post)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                var postReturn = _postService.Insert(post);

                return Ok(_postService.GetPostInfo(postReturn));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("update")]
        [Authorize]
        public ActionResult<PostInfo> Update([FromBody] PostInfo post)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                var postReturn = _postService.Update(post);

                return Ok(_postService.GetPostInfo(postReturn));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("search")]
        [Authorize]
        public ActionResult<PostListPaged> Search([FromBody] PostSearchParam param)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                return Ok(_postService.Search(param));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("publish/{postId:long}")]
        [Authorize]
        public async Task<ActionResult<PostInfo>> Publish(long postId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }
                var post = _postService.GetById(postId);
                if (post == null)
                {
                    return NotFound("Post Not Found");
                }

                var network = post.GetSocialNetwork(
                    HttpContext.RequestServices.GetService(typeof(Bazzuca.Domain.Interface.Factory.ISocialNetworkDomainFactory))
                    as Bazzuca.Domain.Interface.Factory.ISocialNetworkDomainFactory);

                switch (network.Network)
                {
                    case SocialNetworkEnum.LinkedIn:
                        var publishMessage = new PublishMessage
                        {
                            PostId = post.PostId,
                            ClientId = post.ClientId,
                            NetworkId = post.NetworkId,
                            TenantId = _tenantContext.TenantId
                        };
                        var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(publishMessage));
                        var headers = new Dictionary<string, object>
                        {
                            { "X-Tenant-Id", _tenantContext.TenantId },
                            { "x-retry-count", 0 }
                        };
                        _rabbitAppService.Publish("bazzuca.linkedin.exchange", body, headers);
                        post.Status = PostStatusEnum.Queued;
                        post.Update(
                            HttpContext.RequestServices.GetService(typeof(Bazzuca.Domain.Interface.Factory.IPostDomainFactory))
                            as Bazzuca.Domain.Interface.Factory.IPostDomainFactory);
                        return Accepted(_postService.GetPostInfo(post));

                    case SocialNetworkEnum.X:
                        var postReturn = await _postService.Publish(post);
                        return Ok(_postService.GetPostInfo(postReturn));

                    default:
                        return StatusCode(501, $"Publishing to {network.Network} is not yet implemented");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
