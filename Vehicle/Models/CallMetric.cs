using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class CallMetric
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? DropCalls { get; set; }
        public int? Received { get; set; }
        public int? Traffic { get; set; }
        public int? Month { get; set; }

        public virtual MonthlyCall MonthNavigation { get; set; }
        public virtual User User { get; set; }
    }
}
