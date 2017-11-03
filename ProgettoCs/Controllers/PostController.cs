using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProgettoCs.Models;
using ProgettoCs.Interfaces;
using Newtonsoft.Json;

namespace ProgettoCs.Controllers
{
    [Produces("application/json")]
    [Route("api/Post")] //api/Post
    public class PostController : Controller
    {
        private readonly IPostRepository _repository;

        public PostController(IPostRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Post
        [HttpGet]
        public Task<string> Get() => GetPostsInternal();

        private async Task<string> GetPostsInternal()
        {
            var posts = await _repository.GetPosts();
            return JsonConvert.SerializeObject(posts);
        }

        // GET: api/Post/5
        [HttpGet("{id}")]
        public Task<string> Get(Guid id)
        {
            return GetPostById(id);
        }

        private async Task<string> GetPostById(Guid id)
        {
            var res = await _repository.GetPost(id) ?? new Post();
            return JsonConvert.SerializeObject(res);
        }
        
        // POST: api/Post
        [HttpPut]
        public void Put([FromBody]SimplePost value)
        {            
            _repository.AddPost(new Post()
            {
                Id = new Guid(),
                Body = value.Body,
                Title = value.Title,
                PublicationDate = DateTime.Now,
                LastModified = DateTime.Now
            });
            Console.WriteLine(value);
        }

        // PUT: api/Post/5
        [HttpPost]
        public void Post([FromBody]Post value)
        {
            _repository.UpdatePost(value);
        }

        // DELETE: api/Post/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _repository.DeletePost(id);
        }
    }
}

public class SimplePost
{
    public string Title { get; set; }
    public string Body { get; set; }
}