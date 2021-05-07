using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class SpotOnCode
    {
        public int Id { get; set; }
        public string Codex { get; set; }
        public string Registrtion { get; set; }
        public int? UserId { get; set; }
    }
}
