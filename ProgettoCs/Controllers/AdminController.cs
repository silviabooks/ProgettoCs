﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
            if (setting == "initialize")
            {
                _repository.AddPost(new Post()
                {
                    Id = new Guid(),
                    Title = "Post title 1",
                    Body = "Test body 1",
                    PublicationDate = DateTime.Now,
                    LastModified = DateTime.Now
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
