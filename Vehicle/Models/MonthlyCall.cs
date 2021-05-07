using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class MonthlyCall
    {
        public MonthlyCall()
        {
            CallMetrics = new HashSet<CallMetric>();
        }

        public int Id { get; set; }
        public int? AllCalls { get; set; }
        public int? Month { get; set; }

        public virtual ICollection<CallMetric> CallMetrics { get; set; }
    }
}
