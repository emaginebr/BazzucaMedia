using BazzucaMedia.Domain.Interfaces.Services;
using BazzucaMedia.DTO.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using NAuth.Client;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace BazzucaMedia.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ImageController: ControllerBase
    {
        private readonly IUserClient _userClient;
        private readonly IImageService _imageService;

        public ImageController(
            IUserClient userClient,
            IImageService imageService
        ) {
            _userClient = userClient;
            _imageService = imageService;
        }

        [Authorize]
        [HttpPost("uploadImage")]
        public ActionResult<StringResult> UploadImage(IFormFile file)
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
                    return StatusCode(401, "Not Authorized");
                }

                var fileName = _imageService.InsertFromStream(file.OpenReadStream(), file.FileName);
                return new StringResult()
                {
                    Value = _imageService.GetImageUrl(fileName)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
