using Bazzuca.DTO.Post;
using Bazzuca.Infra.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using Bazzuca.Infra.Interface.Repository;
using Bazzuca.Domain.Interface.Factory;
using Bazzuca.Domain.Interface.Models;

namespace Bazzuca.Infra.Repository
{
    public class PostRepository : IPostRepository<IPostModel, IPostDomainFactory>
    {
        private const int PAGE_SIZE = 15;

        private readonly BazzucaContext _context;

        public PostRepository(BazzucaContext context)
        {
            _context = context;
        }

        private IPostModel DbToModel(IPostDomainFactory factory, Post row)
        {
            var model = factory.BuildPostModel();
            model.PostId = row.PostId;
            model.NetworkId = row.NetworkId;
            model.ClientId = row.ClientId;
            model.ScheduleDate = row.ScheduleDate;
            model.PostType = (PostTypeEnum)row.PostType;
            model.MediaUrl = row.S3Key;
            model.Title = row.Title;
            model.Status = (PostStatusEnum)row.Status;
            model.Description = row.Description;
            return model;
        }

        private void ModelToDb(IPostModel model, Post row)
        {
            row.PostId = model.PostId;
            row.NetworkId = model.NetworkId;
            row.ClientId = model.ClientId;
            row.ScheduleDate = model.ScheduleDate;
            row.PostType = (int)model.PostType;
            row.S3Key = model.MediaUrl;
            row.Title = model.Title;
            row.Status = (int)model.Status;
            row.Description = model.Description;
        }

        public IEnumerable<IPostModel> ListByUser(long userId, DateTime ini, DateTime end, IPostDomainFactory factory)
        {
            var rows = _context.Posts
                .Where(
                    x => x.Client.UserId == userId
                    && x.ScheduleDate >= ini
                    && x.ScheduleDate <= end
                )
                .OrderBy(x => x.ScheduleDate)
                .ToList();
            return rows.Select(x => DbToModel(factory, x));
        }

        public IPostModel GetById(long postId, IPostDomainFactory factory)
        {
            var row = _context.Posts.Find(postId);
            return row == null ? null : DbToModel(factory, row);
        }

        public IPostModel GetByScheduleDate(long userId, DateTime scheduleDate, IPostDomainFactory factory)
        {
            var row = _context.Posts
                .Where(
                    x => x.Client.UserId == userId
                    && x.ScheduleDate == scheduleDate
                ).FirstOrDefault();
            return row == null ? null : DbToModel(factory, row);
        }

        public IPostModel Insert(IPostModel model, IPostDomainFactory factory)
        {
            var entity = new Post();
            ModelToDb(model, entity);
            _context.Add(entity);
            _context.SaveChanges();
            model.PostId = entity.PostId;
            return model;
        }

        public IPostModel Update(IPostModel model, IPostDomainFactory factory)
        {
            var row = _context.Posts.FirstOrDefault(x => x.PostId == model.PostId);
            ModelToDb(model, row);
            _context.Posts.Update(row);
            _context.SaveChanges();
            return model;
        }

        public IEnumerable<IPostModel> Search(long userId, long? clientId, int? network, int? status, int pageNum, out int pageCount, IPostDomainFactory factory)
        {
            var currentDate = DateTime.Now;

            var q = _context.Posts.Where(
                x => x.Client.UserId == userId
                && x.ScheduleDate >= currentDate.AddMonths(-2)
                && x.ScheduleDate <= currentDate.AddMonths(2)
            );
            if (clientId.HasValue && clientId.Value > 0)
            {
                q = q.Where(x => x.ClientId == clientId.Value);
            }
            if (network.HasValue && network.Value > 0)
            {
                q = q.Where(x => x.Network.NetworkKey == network.Value);
            }
            if (status.HasValue && status.Value > 0)
            {
                q = q.Where(x => x.Status == status.Value);
            }
            var pages = (double)q.Count() / (double)PAGE_SIZE;
            pageCount = Convert.ToInt32(Math.Ceiling(pages));
            var rows = q.OrderBy(x => x.ScheduleDate)
                .ThenBy(x => x.Title)
                .Skip((pageNum - 1) * PAGE_SIZE)
                .Take(PAGE_SIZE)
                .ToList();
            return rows.Select(x => DbToModel(factory, x));
        }
    }
}