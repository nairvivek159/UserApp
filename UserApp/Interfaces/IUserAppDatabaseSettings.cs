using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserApp.Interfaces
{
    public interface IUserAppDatabaseSettings
    {
        string UserCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
