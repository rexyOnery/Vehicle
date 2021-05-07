using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class LocalArea
    {
        public int Id { get; set; }
        public int? StateId { get; set; }
        public string Lga { get; set; }

        public virtual UserState State { get; set; }
    }
}
