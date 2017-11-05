using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProgettoCs.Models;

namespace ProgettoCs.Data
{
    public class PostContext
    {
        private readonly IMongoDatabase mongoDatabase = null;

        private string connectionString = "mongodb://localhost:27017";

        // Database creation
        public PostContext()
        {
            MongoClient client = new MongoClient(connectionString);
            if(client != null)
                mongoDatabase = client.GetDatabase("YourPersonalBlog");
        }
        // Creation of "Post" collection
        public IMongoCollection<Post> Posts
        {
            get
            {
                return mongoDatabase.GetCollection<Post>("Post");
            }
        }

        // Creation of "Comment" collection
        public IMongoCollection<Comment> Comments
        {
            get
            {
                return mongoDatabase.GetCollection<Comment>("Comment");
            }
        }
    }
}
