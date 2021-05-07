using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class Payment
    {
        public int Id { get; set; }
        public int? AgentId { get; set; }
        public string Amount { get; set; }
        public string DatePaid { get; set; }
        public bool? Paid { get; set; }

        public virtual Agent Agent { get; set; }
    }
}
