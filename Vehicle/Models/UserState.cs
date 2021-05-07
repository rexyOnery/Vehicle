using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class UserState
    {
        public UserState()
        {
            LocalAreas = new HashSet<LocalArea>();
        }

        public int Id { get; set; }
        public string State { get; set; }

        public virtual ICollection<LocalArea> LocalAreas { get; set; }
    }
}
