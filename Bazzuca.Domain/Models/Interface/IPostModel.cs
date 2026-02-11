using Bazzuca.DTO.Post;
using Bazzuca.DTO.SocialNetwork;
using System;
using System.Collections.Generic;
using Bazzuca.Domain.Interface.Factory;

namespace Bazzuca.Domain.Interface.Models
{
    public interface IPostModel
    {
        long PostId { get; set; }
        long NetworkId { get; set; }
        long ClientId { get; set; }
        DateTime ScheduleDate { get; set; }
        PostTypeEnum PostType { get; set; }
        string MediaUrl { get; set; }
        string Title { get; set; }
        PostStatusEnum Status { get; set; }
        string Description { get; set; }
        ISocialNetworkModel GetSocialNetwork(ISocialNetworkDomainFactory factory);
        IClientModel GetClient(IClientDomainFactory factory);

        IPostModel GetById(long postId, IPostDomainFactory factory);
        IPostModel GetByScheduleDate(long userId, DateTime scheduleDate, IPostDomainFactory factory);
        IEnumerable<IPostModel> ListByUser(long userId, DateTime start, DateTime end, IPostDomainFactory factory);
        IPostModel Insert(IPostDomainFactory factory);
        IPostModel Update(IPostDomainFactory factory);

        IEnumerable<IPostModel> Search(long userId, long? clientId, SocialNetworkEnum? network, PostStatusEnum? status, int pageNum, out int pageCount, IPostDomainFactory factory);
    }
}