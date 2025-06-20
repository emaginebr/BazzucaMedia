using Core.Domain.Repository;
using DB.Infra.Context;
using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.Domain.Interfaces.Models;
using System.Collections.Generic;
using System.Linq;

namespace DB.Infra.Repository
{
    public class PostRepository : IPostRepository<IPostModel, IPostDomainFactory>
    {
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
            model.UserId = row.UserId;
            model.ScheduleDate = row.ScheduleDate;
            model.PostType = row.PostType;
            model.S3Key = row.S3Key;
            model.Title = row.Title;
            model.Status = row.Status;
            model.Description = row.Description;
            return model;
        }

        private void ModelToDb(IPostModel model, Post row)
        {
            row.PostId = model.PostId;
            row.NetworkId = model.NetworkId;
            row.UserId = model.UserId;
            row.ScheduleDate = model.ScheduleDate;
            row.PostType = model.PostType;
            row.S3Key = model.S3Key;
            row.Title = model.Title;
            row.Status = model.Status;
            row.Description = model.Description;
        }

        public IEnumerable<IPostModel> ListByUser(long userId, int take, IPostDomainFactory factory)
        {
            var rows = _context.Posts
                .Where(x => x.UserId == userId)
                .OrderBy(x => x.ScheduleDate)
                .Take(take)
                .ToList();
            return rows.Select(x => DbToModel(factory, x));
        }

        public IPostModel GetById(long postId, IPostDomainFactory factory)
        {
            var row = _context.Posts.Find(postId);
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
    }
}