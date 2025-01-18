using StudentsWebApp.Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using TsWebApp.Managers;
using System.Web.UI.WebControls;
using StudentsWebApp.Payment;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using StudentsWebApp.Financial;

namespace StudentsWebApp.Managers
{
    public class StudentDataManager: BaseDataManager
    {
        string connectionString;
        public List<Student> LoadStudentData(string searchName)
        {
           // Call the GetSPItems function with the single parameter
            return GetSPItems("SearchStudentsByName", mapFunction, searchName);
        }
        public Student LoadStudent(int id)
        {
            List<Student> students = new List<Student>();
            // Call the GetSPItems function with the single parameter
            students = GetSPItems("GetStudentByID", mapFunction, id);
            return students[0];
        }
        Func<SqlDataReader, Student> mapFunction = (reader) =>
        {
            int gender = reader.GetInt32(2);
            GenderEnum genderEnum = gender == 2 ? GenderEnum.Female : GenderEnum.Male;

            string PaymentDesc = reader.GetString(5).Trim();
            // Deserialize the JSON string directly to a dynamic object
            Object paymentDetails = JsonConvert.DeserializeObject(PaymentDesc,new JsonSerializerSettings { TypeNameHandling = Newtonsoft.Json.TypeNameHandling.Objects });
            var paymentMethod = paymentDetails as PaymentMethod;

            string FinancialAidDesc = reader.GetString(6).Trim();
            // Deserialize the JSON string directly to a dynamic object
            Object FinancialAidDetails = JsonConvert.DeserializeObject(FinancialAidDesc, new JsonSerializerSettings { TypeNameHandling = Newtonsoft.Json.TypeNameHandling.Objects });
            var FinancialAid = FinancialAidDetails as FinancialAid;
            // Now you can use paymentMethod in your return statement
            return new Student
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                Gender = genderEnum,
                DepartmentID = reader.GetInt32(3),
                UniID = reader.GetInt32(4),
                PaymentMethod = paymentMethod,
                FinancialAid = FinancialAid

            };

        };


        public void AddStudent(string name, int gender, int DepartmentID, int UniID, string PaymentMethod,string FinancialAid)
        {
           
            int rows = ExecuteNonQuery("InsertStudent", name, gender, DepartmentID, UniID, PaymentMethod,FinancialAid);
        }
        public void UpdateStudent(int id, string name, int gender, int DepartmentID, int UniID, string PaymentMethod,string FinancialAid)
        {
            int rows = ExecuteNonQuery("UpdateStudent", id, name, gender,DepartmentID,UniID, PaymentMethod,FinancialAid);
        }
        public StudentDataManager(string connectionString)
        {
            this.connectionString = connectionString;
        }
    }
}