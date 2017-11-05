using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProgettoCs.Models
{
    public class Comment
    {
        [BsonId]
        public Guid Id { get; set; }
        public DateTime CommentedOn { get; set; } = DateTime.Now;
        public string Author { get; set; }
        public string Body { get; set; }
        public Guid PostId { get; set; }
        
    }
}
