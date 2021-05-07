using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class User
    {
        public User()
        {
            CallMetrics = new HashSet<CallMetric>();
            Specialists = new HashSet<Specialist>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string LoginName { get; set; }
        public string Password { get; set; }
        public string StateOrigin { get; set; }
        public string LocalGovt { get; set; }
        public string DateRegistered { get; set; }
        public string SubscriptionDate { get; set; }
        public string SubscriptionExpires { get; set; }
        public bool? Busy { get; set; }
        public bool? IsDoc { get; set; }
        public string ConfirmationCode { get; set; }
        public bool? IsNew { get; set; }

        public virtual ICollection<CallMetric> CallMetrics { get; set; }
        public virtual ICollection<Specialist> Specialists { get; set; }
    }
}
