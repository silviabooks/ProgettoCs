using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using ProgettoCs.Models;
using MongoDB.Bson;
using ProgettoCs.Interfaces;
using Microsoft.Extensions.Options;

namespace ProgettoCs.Data
{
    public class PostRepository: IPostRepository
    {
        private readonly PostContext context = null;

        public PostRepository()
        {
            context = new PostContext();
        }

        public async Task<IEnumerable<Post>> GetPosts()
        {
            return await context.Posts.Find(_ => true).ToListAsync();
        }

        public async Task<Post> GetPost(Guid id)
        { 
            var filter = Builders<Post>.Filter.Eq("Id", id);
            return await context.Posts.Find(filter).FirstOrDefaultAsync();
        }

        public async Task AddPost(Post post) => await context.Posts.InsertOneAsync(post);

        public async Task<bool> DeletePost(Guid id)
        {
            var filter = Builders<Post>.Filter.Eq("Id", id);
            DeleteResult res = await context.Posts.DeleteOneAsync(filter);
            return res.IsAcknowledged && res.DeletedCount > 0;
        }

        public async Task<bool> UpdatePost(Post post)
        {
            ReplaceOneResult res = await context.Posts
                .ReplaceOneAsync(nameof => nameof.Id.Equals(post.Id), post, new UpdateOptions { IsUpsert = true });

            return res.IsAcknowledged && res.MatchedCount > 0;
        }

        public async Task<bool> UpdatePost(Guid id, string body)
        {
            var filter = Builders<Post>.Filter.Eq(s => s.Id, id);
            var update = Builders<Post>.Update
                                .Set(s => s.Body, body)
                                .CurrentDate(s => s.LastModified);
            UpdateResult res =  await context.Posts.UpdateOneAsync(filter, update);

            return res.IsAcknowledged && res.ModifiedCount > 0;
        }


        // COMMENTS FUNCTIONS:

        public async Task AddComment(Comment c) => await context.Comments.InsertOneAsync(c);

        public async Task<IEnumerable<Comment>> GetPostComments(Guid postId)
        {
            var filter = Builders<Comment>.Filter.Eq("PostId", postId);
            return await context.Comments.Find(filter).ToListAsync();
        }

    }
}
