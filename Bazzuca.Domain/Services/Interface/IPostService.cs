using Bazzuca.DTO.Post;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bazzuca.Domain.Interface.Models;

namespace Bazzuca.Domain.Interface.Services
{
    public interface IPostService
    {
        IEnumerable<IPostModel> ListByUser(long userId, int month, int year);
        IPostModel GetById(long postId);
        PostInfo GetPostInfo(IPostModel model);
        IPostModel Insert(PostInfo post);
        IPostModel Update(PostInfo post);
        PostListPaged Search(PostSearchParam param);
        PostInfo Publish(PostInfo postInfo, long userId, string tenantId);
        Task<PostInfo> PublishDirect(PostInfo postInfo, long userId, bool headless = true);
        IPostModel MarkAsPublished(long postId);
    }
}