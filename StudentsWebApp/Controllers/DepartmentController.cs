using StudentsWebApp.Entity;
using DepartmentsWebApp.Managers;
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

    public class DepartmentController : ApiController
    {


        DepartmentManager DepartmentManager;
        public DepartmentController()
        {
            DepartmentManager = new DepartmentManager("Data Source=MH2009\\SQLEXPRESS;Initial Catalog=Departments;Integrated Security=True");
        }

        [HttpGet]
        public IEnumerable<DepartmentDetails> GetFilteredDepartments(string filter)
        {
            string SearchFilter = filter != null ? filter : "";
            var filteredDepartments = DepartmentManager.GetDepartmentsDetails(SearchFilter);

            return filteredDepartments;
        }
        [HttpGet]
        public IEnumerable<Department> GetDepartments(string filter)
        {
            string SearchFilter = filter != null ? filter : "";
            return DepartmentManager.GetDepartments(SearchFilter);       
        }
        [HttpGet]
        public Department GetIntireDepartment(int id)
        {

            Department department = DepartmentManager.GetDepartment(id);
            return department;
        }
        [HttpPost]
        public bool AddDepartment([FromBody] Department Department)
        {
            if (Department == null || Department.UniversityId == 0)
            {
                return false; // Invalid Department data
            }

            try
            {
                DepartmentManager.AddDepartment( Department.Name,Department.UniversityId);
                return true; // Department added successfully
            }
            catch (Exception ex)
            {
                LogException(ex);
                return false; // Failed to add Department
            }
        }

        [HttpPost]
        public bool UpdateDepartment([FromBody] Department Department)
        {
            if (Department == null || Department.UniversityId == 0)
            {
                return false; // Invalid Department data
            }
            try
            {
                DepartmentManager.UpdateDepartment(Department.Id, Department.Name, Department.UniversityId);

                return true; // Department updated successfully
            }
            catch (Exception ex)
            {
                LogException(ex);
                return false; // Failed to update Department
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
