using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class Sponsorship
    {
        public int Id { get; set; }
        public int? ToalBenefiary { get; set; }
        public string LocalGovt { get; set; }
    }
}
