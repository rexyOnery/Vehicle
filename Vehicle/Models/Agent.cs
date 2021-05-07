using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class Agent
    {
        public Agent()
        {
            Payments = new HashSet<Payment>();
            Vitsusers = new HashSet<Vitsuser>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string LoginName { get; set; }
        public string Password { get; set; }
        public string Photo { get; set; }
        public string Phone { get; set; }
        public string Admin { get; set; }
        public bool? Disabled { get; set; }
        public string ConfirmationCode { get; set; }

        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<Vitsuser> Vitsusers { get; set; }
    }
}
