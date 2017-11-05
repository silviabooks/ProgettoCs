using System;
using Microsoft.AspNetCore.Mvc;
using ProgettoCs.Interfaces;
using ProgettoCs.Models;

namespace ProgettoCs.Controllers
{
    [Produces("application/json")]
    [Route("api/Admin")]
    public class AdminController : Controller
    {
        private readonly IPostRepository _repository;

        public AdminController(IPostRepository repository)
        {
            _repository = repository;
        }
        
        // HTTP call for initialization: api/admin/initialize
        [HttpGet("{setting}")]
        public string Get(string setting)
        {

            Post post1 = new Post()
            {
                Id = new Guid(),
                Title = "Post title 1",
                Body = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem " +
                "accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab " +
                "illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. " +
                "Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed " +
                "quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque " +
                "porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci " +
                "velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam " +
                "aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem " +
                "ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
                PublicationDate = DateTime.Now,
                LastModified = DateTime.Now
            };



            if (setting == "initialize")
            {
                _repository.AddPost(post1);

                _repository.AddComment(new Comment()
                {
                    Id = new Guid(),
                    Author = "Peppe",
                    Body = "This post is lame!",
                    PostId = post1.Id,
                    CommentedOn = DateTime.Now
                });

                _repository.AddComment(new Comment()
                {
                    Id = new Guid(),
                    Author = "Salvo",
                    Body = "Bla bla bla bla bla",
                    PostId = post1.Id,
                    CommentedOn = DateTime.Now
                });
                _repository.AddPost(new Post()
                {
                    Id = new Guid(),
                    Title = "Post title 2",
                    Body = "Test body 2",
                    PublicationDate = DateTime.Now,
                    LastModified = DateTime.Now
                });
                _repository.AddPost(new Post()
                {
                    Id = new Guid(),
                    Title = "Post title 3",
                    Body = "Test body 3",
                    PublicationDate = DateTime.Now,
                    LastModified = DateTime.Now
                });
                _repository.AddPost(new Post()
                {
                    Id = new Guid(),
                    Title = "Post title 4",
                    Body = "Test body 4",
                    PublicationDate = DateTime.Now,
                    LastModified = DateTime.Now
                });

                return "Done";
            }

            return "Unknown";
        }        
    }
}
