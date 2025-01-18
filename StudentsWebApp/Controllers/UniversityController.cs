using StudentsWebApp.Entity;
using UniversitysWebApp.Managers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using StudentsWebApp.Managers;

namespace StudentsWebApp.Controllers
{

    public class UniversityController : ApiController
    {


        UniversityManager UniversityManager;
        public UniversityController()
        {
            UniversityManager = new UniversityManager("Data Source=MH2009\\SQLEXPRESS;Initial Catalog=Universitys;Integrated Security=True");
        }

        [HttpGet]
        public IEnumerable<University> GetFilteredUniversitys(string filter)
        {
            string SearchFilter = filter != null ? filter : "";
            var filteredUniversitys = UniversityManager.GetUniversitys(SearchFilter);

            return filteredUniversitys;
        }
        [HttpGet]
        public IEnumerable<UniversityInfo> GetUniversitiesInfo(string filter)
        {
            string SearchFilter = filter != null ? filter : "";
            var filteredUniversitys = UniversityManager.GetUniversitiesInfo(SearchFilter);

            return filteredUniversitys;
        }
        [HttpGet]
        public University GetIntireUni(int id)
        {
            University uni = UniversityManager.GetUniversity(id);

            return uni;
        }
        [HttpPost]
        public bool AddUniversity([FromBody] University University)
        {
            if (University == null || University.Name == "")
            {
                return false; // Invalid University data
            }

            try
            {
                UniversityManager.AddUniversity( University.Name);
                return true; // University added successfully
            }
            catch (Exception ex)
            {
                LogException(ex);
                return false; // Failed to add University
            }
        }

        [HttpPost]
        public bool UpdateUniversity([FromBody] University University)
        {
            if (University == null)
            {
                return false; // Invalid University data
            }

            try
            {
                UniversityManager.UpdateUniversity(University.Id, University.Name);

                return true; // University updated successfully
            }
            catch (Exception ex)
            {
                LogException(ex);
                return false; // Failed to update University
            }
        }

        private void LogException(Exception ex)
        {
            // Log the exception details (you can customize this based on your logging needs)
            Console.WriteLine($"Exception: {ex.Message}");
            Console.WriteLine($"StackTrace: {ex.StackTrace}");
        }

    }
}
