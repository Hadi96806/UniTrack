using StudentsWebApp.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DepartmentsWebApp.Managers;
using UniversitysWebApp.Managers;

namespace StudentsWebApp.Managers
{
    public class DepartmentManager
    {
        List<Department> Departments = new List<Department>();
        List<DepartmentDetails> DepartmentDetails = new List<DepartmentDetails>();
        private UniversityDataManager UnidataManager;
        private DepartmentDataManager dataManager;

        public DepartmentManager(string connectionString)
        {
            dataManager = new DepartmentDataManager(connectionString);
            UnidataManager = new UniversityDataManager(connectionString);
        }

        public void AddDepartment( string name, int UniversityId)
        {
            // You can perform additional logic here if needed
            dataManager.AddDepartment(name, UniversityId);
        }
        public void UpdateDepartment(int id, string name,int UniversityId)
        {
            dataManager.UpdateDepartment(id, name, UniversityId);
        }
        public List<DepartmentDetails> GetDepartmentsDetails(string filteredName)
        {
            DepartmentDetails departmentDetails;
            Departments = dataManager.LoadDepartmentData(filteredName);
            foreach (Department department in Departments)
            {
                University uni = UnidataManager.LoadUniversityName(department.UniversityId);
                departmentDetails = new DepartmentDetails(department.Id, department.Name, uni.Name);
                    DepartmentDetails.Add(departmentDetails);
                

            }
            return DepartmentDetails;

        }
        public List<Department> GetDepartments(string filteredName)
        {
            Departments = dataManager.LoadDepartmentData(filteredName);
            return Departments;

        }
        public Department GetDepartment(int id)
        {
            return dataManager.LoadDepartment(id);
        }
    }
}