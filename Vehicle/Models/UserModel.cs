using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vehicle.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Phone { get; set; }
        public IFormFile Pix { get; set; }
        public int? AgentId { get; set; }
    }

    public class DashItems
    {
        public string Customers { get; set; }
        public string ActiveCustomers { get; set; }
        public string Accrued { get; set; }
    }
}
