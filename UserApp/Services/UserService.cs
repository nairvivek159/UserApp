using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserApp.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using UserApp.Interfaces;

namespace UserApp.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IUserAppDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UserCollectionName);
        }

        public List<User> Get() =>
            _users.Find(user => true).ToList();



        public User Get(string id) =>
            _users.Find<User>(user => user.Id == id).FirstOrDefault();

        public User ValidateUser(string mobileNumber, string password) =>
            _users.Find<User>(user => user.MobileNumber == mobileNumber && user.Password == password).FirstOrDefault();

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }
    }
}
