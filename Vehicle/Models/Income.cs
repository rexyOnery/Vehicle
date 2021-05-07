using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class Income
    {
        public int Id { get; set; }
        public string MonthYear { get; set; }
        public int? Amount { get; set; }
    }
}
