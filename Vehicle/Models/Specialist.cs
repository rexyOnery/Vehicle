using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class Specialist
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string Specialization { get; set; }
        public string Language { get; set; }
        public string Photo { get; set; }
        public bool? Approved { get; set; }
        public bool? Login { get; set; }

        public virtual User User { get; set; }
    }
}
