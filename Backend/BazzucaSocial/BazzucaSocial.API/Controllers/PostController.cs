using BazzucaSocial.Domain.Impl.Services;
using BazzucaSocial.Domain.Interfaces.Services;
using BazzucaSocial.DTO.Domain;
using BazzucaSocial.DTO.Post;
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
    public class PostController: ControllerBase
    {
        private readonly IUserClient _userClient;
        private readonly IPostService _postService;

        public PostController(IUserClient userClient, IPostService postService)
        {
            _userClient = userClient;
            _postService = postService;
        }

        [HttpGet("listByUser")]
        [Authorize]
        public ActionResult<PostListResult> ListByUser()
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var posts = _postService.ListByUser(userSession.UserId);

                return new PostListResult
                {
                    Values = posts.Select(x => _postService.GetPostInfo(x)).ToList()
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getById/{postId}")]
        [Authorize]
        public ActionResult<PostResult> GetById(long postId)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var post = _postService.GetById(postId);
                if (post == null)
                {
                    return new PostResult { Value = null, Sucesso = false, Mensagem = "Post Not Found" };
                }

                return new PostResult()
                {
                    Value = _postService.GetPostInfo(post)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("insert")]
        [Authorize]
        public ActionResult<PostResult> Insert([FromBody] PostInfo post)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var postReturn = _postService.Insert(post);

                return new PostResult
                {
                    Value = _postService.GetPostInfo(postReturn)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("update")]
        [Authorize]
        public ActionResult<PostResult> Update([FromBody] PostInfo post)
        {
            try
            {
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return StatusCode(401, "Not Authorized");
                }
                var postReturn = _postService.Update(post);

                return new PostResult
                {
                    Value = _postService.GetPostInfo(postReturn)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
