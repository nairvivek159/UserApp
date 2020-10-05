using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserApp.Interfaces;

namespace UserApp.Models
{
    public class UserAppDatabaseSettings : IUserAppDatabaseSettings
    {
        public string UserCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
