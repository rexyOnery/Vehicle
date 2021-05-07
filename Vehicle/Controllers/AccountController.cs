using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicle.Services;

namespace Vehicle.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        public IActionResult Forgot()
        {
            return View();
        }

        public IActionResult ConfirmCode()
        {
            return View();
        }

        public IActionResult ChangePassword()
        {
            return View();
        }

        public IActionResult ResetPassword(string email)
        {
            ViewBag.Email = email;
            return View();
        }

        public async Task<bool> PasswordChange(string email, string password)
        {
            var docinfo = await ForgotRepo.PasswordChange(email, password);
            if (docinfo == "password changed")
                return true;
            else
                return false;
        }
    }
}
