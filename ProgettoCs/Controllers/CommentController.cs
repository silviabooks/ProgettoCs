﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProgettoCs.Interfaces;
using Newtonsoft.Json;
using ProgettoCs.Models;

namespace ProgettoCs.Controllers
{
    [Produces("application/json")]
    [Route("api/Comment")]
    public class CommentController : Controller
    {
        private readonly IPostRepository _repo;

        public CommentController(IPostRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("{id}")]
        public Task<string> Get(Guid id)
        {
            return GetCommentsInternal(id);
        }

        private async Task<string> GetCommentsInternal(Guid id)
        {
            var res = await _repo.GetPostComments(id);
            return JsonConvert.SerializeObject(res);
        }

        [HttpPut]
        public void Put([FromBody]Comment value)
        {
            _repo.AddComment(value);
            Console.WriteLine(value);
        }
    }
}