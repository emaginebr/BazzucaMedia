using BazzucaMedia.Domain.Interfaces.Models;
using BazzucaMedia.DTO.Post;
using System.Collections.Generic;

namespace BazzucaMedia.Domain.Interfaces.Services
{
    public interface IPostService
    {
        IEnumerable<IPostModel> ListByUser(long userId);
        IPostModel GetById(long postId);
        PostInfo GetPostInfo(IPostModel model);
        IPostModel Insert(PostInfo post);
        IPostModel Update(PostInfo post);
    }
}