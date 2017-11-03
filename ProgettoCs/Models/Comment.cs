using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProgettoCs.Models
{
    public class Comment
    {


        public DateTime TimePosted { get; set; }

        public string Email { get; set; }

        public string Author { get; set; }

        public string Body { get; set; }
    }
}
