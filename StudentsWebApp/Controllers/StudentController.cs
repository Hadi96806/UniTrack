using StudentsWebApp.Entity;
using StudentsWebApp.Managers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using Newtonsoft.Json;

namespace StudentsWebApp.Controllers
{
    
    public class StudentController : ApiController
    {
        

        StudentManager studentManager;
        public StudentController()
        {
            studentManager = new StudentManager("Data Source=MH2009\\SQLEXPRESS;Initial Catalog=Students;Integrated Security=True");
        }

        [HttpGet]
        public IEnumerable<StudentDetails> GetFilteredStudents(string filter)
        {
            string SearchFilter = filter != null ? filter : "";
            var filteredStudents = studentManager.GetStudents(SearchFilter);

            return filteredStudents;
        }
        [HttpGet]
        public Student GetIntireStudent(int id)
        {
             Student student = studentManager.GetStudent(id);

            return student;
        }
        [HttpPost]
        public bool AddStudent([FromBody] Student student)
        {
            if (student == null || student.FinancialAid == null)
            {
                return false; // Invalid student data
            }

            try
            {
               
                int gender = student.Gender.ToString() == "Male" ? 1 : 2;
                studentManager.AddStudent(student.Name, gender , student.DepartmentID, student.UniID, student.PaymentMethod ,student.FinancialAid);
                return true; // Student added successfully
            }
            catch (Exception ex)
            {
                LogException(ex);
                return false; // Failed to add student
            }
        }


        [HttpPost]
        public bool UpdateStudent([FromBody] Student student)
        {
            if (student== null || student.FinancialAid==null)
            {
                return false; // Invalid student data
            }

            try
            {
                
                int gender = student.Gender.ToString() == "Male" ? 1 : 2;
                studentManager.UpdateStudent(student.Id, student.Name, gender,student.DepartmentID,student.UniID, student.PaymentMethod, student.FinancialAid);
                return true; // Student updated successfully
            }
            catch (Exception ex)
            {
                LogException(ex);
                return false; // Failed to update student
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
