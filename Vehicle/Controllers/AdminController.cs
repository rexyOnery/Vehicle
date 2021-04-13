using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicle.Models;
using Vehicle.Services;

namespace Vehicle.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Active()
        {
            return View();
        }

        public IActionResult Existing()
        {
            return View();
        }

        public IActionResult Expired()
        {
            return View();
        }

        public IActionResult Completed()
        {
            return View();
        }

        public IActionResult Inprogress()
        {
            return View();
        }

        public IActionResult Pending()
        {
            return View();
        }

        public IActionResult Details()
        {
            return View();
        }

        public IActionResult Search()
        {
            return View();
        }

        public async Task<List<DashItems>> GetAdminDashBoardInfo()
        {
            return Server.GetAdminDashBoardInfoAsync();
        }

        public async Task<List<UserItems>> GetAllForAdmin()
        {
            return Server.GetAllForAdminAsync();
        }
    }
}
