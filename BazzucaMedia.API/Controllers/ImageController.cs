using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using NAuth.ACL.Interfaces;
using BazzucaMedia.Domain.Interface.Services;

namespace BazzucaMedia.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IUserClient _userClient;
        private readonly IS3Service _imageService;

        public ImageController(
            IUserClient userClient,
            IS3Service imageService
        )
        {
            _userClient = userClient;
            _imageService = imageService;
        }

        [RequestSizeLimit(100_000_000)]
        [Authorize]
        [HttpPost("uploadImage")]
        public ActionResult<string> UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("No file uploaded");
                }
                var userSession = _userClient.GetUserInSession(HttpContext);
                if (userSession == null)
                {
                    return Unauthorized("Not Authorized");
                }

                var fileName = _imageService.InsertFromStream(file.OpenReadStream(), file.FileName);
                return Ok(_imageService.GetImageUrl(fileName));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
