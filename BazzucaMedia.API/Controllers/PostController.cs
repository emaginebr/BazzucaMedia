using BazzucaMedia.DTO.Post;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NAuth.ACL.Interfaces;
using BazzucaMedia.Domain.Interface.Services;

namespace BazzucaMedia.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IUserClient _userClient;
        private readonly IPostService _postService;

        public PostController(IUserClient userClient, IPostService postService)
        {
            _userClient = userClient;
            _postService = postService;
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
                var postReturn = await _postService.Publish(post);

                return Ok(_postService.GetPostInfo(postReturn));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
