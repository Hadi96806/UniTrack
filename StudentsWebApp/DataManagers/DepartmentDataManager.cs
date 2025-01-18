using StudentsWebApp.Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using StudentsWebApp.Managers;
using TsWebApp.Managers;

namespace DepartmentsWebApp.Managers
{
    public class DepartmentDataManager:BaseDataManager
    {
        string connectionString;
        public List<Department> LoadDepartmentData(string searchName)
        {
            // Call the GetSPItems function with the single parameter
            return GetSPItems("SearchDepartmentByName", mapFunction, searchName);
        }
        //public List<Department> LoadDepartments(int UniID)
        //{
        //    // Call the GetSPItems function with the single parameter
        //    return GetSPItems("GetDepartmentsByUniversityId", mapFunction, UniID);
        //}
        public Department LoadDepartment(int id)
        {
            List<Department> departments = new List<Department>();
            // Call the GetSPItems function with the single parameter
            departments = GetSPItems("GetDepartmentByID", mapFunction, id);
            return departments[0];
        }
        Func<SqlDataReader, Department> mapFunction = (reader) =>
        {
      

            return new Department
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                UniversityId = reader.GetInt32(2)
            };
        };


        public void AddDepartment( string name,int UniversityId)
        {

            int rows = ExecuteNonQuery("InsertDepartment",  name , UniversityId);
        }
        public void UpdateDepartment(int id, string name,int UniversityId)
        {
            int rows = ExecuteNonQuery("UpdateDepartment", id, name, UniversityId);
        }
        public DepartmentDataManager(string connectionString)
        {
            this.connectionString = connectionString;
        }
    }
}