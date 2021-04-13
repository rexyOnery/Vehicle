using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class Vitsuser
    {
        public Vitsuser()
        {
            Vitsitems = new HashSet<Vitsitem>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Phone { get; set; }
        public string Pix { get; set; }
        public int? AgentId { get; set; }

        public virtual Agent Agent { get; set; }
        public virtual ICollection<Vitsitem> Vitsitems { get; set; }
    }
}
