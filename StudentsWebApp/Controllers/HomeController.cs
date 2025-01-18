using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StudentsWebApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        public ActionResult DepartmentManagment()
        {
            ViewBag.Title = "Departments";
            return View();
        }
        public ActionResult UniversityManagment()
        {
            ViewBag.Title = "Universities";
            return View();
        }
    }
}
