using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vehicle.Models
{
    public class ItemModel
    {
        public int Id { get; set; }
        public string PlateNumber { get; set; }
        public string ChasisNumber { get; set; }
        public string ItemType { get; set; }
        public bool Paid { get; set; }
        public string TagNumber { get; set; }
        public string RegisteredDate { get; set; }
        public IFormFile Photo { get; set; }
        public int? UserId { get; set; }
    }
}
