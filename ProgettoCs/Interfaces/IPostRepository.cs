using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProgettoCs.Models;
using MongoDB.Driver;

namespace ProgettoCs.Interfaces
{
    public interface IPostRepository
    {
        //POSTS METHODS:
        // retrieve all posts
        Task<IEnumerable<Post>> GetPosts();
        // get one post with Id = id
        Task<Post> GetPost(Guid id);
        // add a post
        Task AddPost(Post post);
        // delete a post
        Task<bool> DeletePost(Guid id);
        // update a post
        Task<bool> UpdatePost(Post body);
        // update a post (only the post body)
        Task<bool> UpdatePost(Guid id, string body);

        // COMMENTS METHODS:
        Task AddComment(Comment c);
        // get all the comments of a post with Id = postId
        Task<IEnumerable<Comment>> GetPostComments(Guid postId);
    }
}
