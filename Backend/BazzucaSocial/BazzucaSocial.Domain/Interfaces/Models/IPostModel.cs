using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.DTO.Post;
using System;
using System.Collections.Generic;

namespace BazzucaSocial.Domain.Interfaces.Models
{
    public interface IPostModel
    {
        long PostId { get; set; }
        long NetworkId { get; set; }
        long ClientId { get; set; }
        DateTime ScheduleDate { get; set; }
        PostTypeEnum PostType { get; set; }
        string S3Key { get; set; }
        string Title { get; set; }
        PostStatusEnum Status { get; set; }
        string Description { get; set; }
        ISocialNetworkModel GetSocialNetwork(ISocialNetworkDomainFactory factory);
        IClientModel GetClient(IClientDomainFactory factory);

        IEnumerable<IPostModel> ListByUser(long userId, IPostDomainFactory factory);
        IPostModel GetById(long postId, IPostDomainFactory factory);
        IPostModel Insert(IPostDomainFactory factory);
        IPostModel Update(IPostDomainFactory factory);
    }
}