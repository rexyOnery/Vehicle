using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class Treatment
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string DocId { get; set; }
        public string DateTreated { get; set; }
        public bool? Viewed { get; set; }
        public string Symptom { get; set; }
        public string Treatment1 { get; set; }
    }
}
