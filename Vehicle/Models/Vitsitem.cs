using System;
using System.Collections.Generic;

#nullable disable

namespace Vehicle.Models
{
    public partial class Vitsitem
    {
        public int Id { get; set; }
        public string TagNumber { get; set; }
        public string ItemType { get; set; }
        public string Photo { get; set; }
        public string PlateNumber { get; set; }
        public string ChasisNumber { get; set; }
        public bool? Paid { get; set; }
        public int? VitsuserId { get; set; }
        public string RegisteredDate { get; set; }
        public string AgentMonth { get; set; }

        public virtual Vitsuser Vitsuser { get; set; }
    }
}
