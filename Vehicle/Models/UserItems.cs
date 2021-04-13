using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vehicle.Models
{
    public class UserItems
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
        public string Phone { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Pix { get; set; }
        public string Expired { get; set; }
          
        public int AgentId { get; set; }
        public int ItemId { get; set; }
        public string ItemType { get; set; }
        public bool Paid { get; set; }
        public string TagNumber { get; set; } 


    }
}
