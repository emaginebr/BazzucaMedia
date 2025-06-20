using BazzucaSocial.Domain.Interfaces.Factory;
using System;
using System.Collections.Generic;

namespace BazzucaSocial.Domain.Interfaces.Models
{
    public interface IPostModel
    {
        long PostId { get; set; }
        long NetworkId { get; set; }
        long UserId { get; set; }
        DateTime ScheduleDate { get; set; }
        int PostType { get; set; }
        string S3Key { get; set; }
        string Title { get; set; }
        int Status { get; set; }
        string Description { get; set; }

        IEnumerable<IPostModel> ListByUser(long userId, int take, IPostDomainFactory factory);
        IPostModel GetById(long postId, IPostDomainFactory factory);
        IPostModel Insert(IPostDomainFactory factory);
        IPostModel Update(IPostDomainFactory factory);
    }
}