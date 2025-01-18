using DepartmentsWebApp.Managers;
using Newtonsoft.Json;
using StudentsWebApp.Entity;
using StudentsWebApp.Financial;
using StudentsWebApp.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UniversitysWebApp.Managers;

namespace StudentsWebApp.Managers
{
    public class StudentManager
    {
        List<Student> students = new List<Student>();
        List<StudentDetails> studentsDetails = new List<StudentDetails>();
        private StudentDataManager dataManager;
        private DepartmentDataManager Dep_dataManager;
        private UniversityDataManager Uni_dataManager;
        public StudentManager(string connectionString)
        {
            dataManager = new StudentDataManager(connectionString);
            Dep_dataManager = new DepartmentDataManager(connectionString);
            Uni_dataManager = new UniversityDataManager(connectionString);
        }

        public void AddStudent(string name, int gender, int DepartmentID, int UniID, PaymentMethod PaymentMethod, FinancialAid FinancialAid)
        {
            string paymentMethodJson = JsonConvert.SerializeObject(PaymentMethod, new JsonSerializerSettings { TypeNameHandling = Newtonsoft.Json.TypeNameHandling.Objects });
            string FinancialAidJson = JsonConvert.SerializeObject(FinancialAid, new JsonSerializerSettings { TypeNameHandling = Newtonsoft.Json.TypeNameHandling.Objects });
            System.Diagnostics.Debug.WriteLine($"Serialized string from DB: {FinancialAidJson}");
            System.Diagnostics.Debug.WriteLine($"Original string from DB: {FinancialAid}");
            dataManager.AddStudent(name, gender, DepartmentID, UniID, paymentMethodJson,FinancialAidJson);
        }
        public void UpdateStudent(int id, string name, int gender,int DepartmentID,int UniID, PaymentMethod PaymentMethod, FinancialAid FinancialAid)
        {
            string paymentMethodJson = JsonConvert.SerializeObject(PaymentMethod, new JsonSerializerSettings { TypeNameHandling = Newtonsoft.Json.TypeNameHandling.Objects });
            string FinancialAidJson = JsonConvert.SerializeObject(FinancialAid, new JsonSerializerSettings { TypeNameHandling = Newtonsoft.Json.TypeNameHandling.Objects });
            System.Diagnostics.Debug.WriteLine($"Serialized string from DB: {FinancialAidJson}");
            System.Diagnostics.Debug.WriteLine($"Original string from DB: {FinancialAid}");
            dataManager.UpdateStudent(id, name, gender,DepartmentID,UniID, paymentMethodJson,FinancialAidJson);
        }
        public List<StudentDetails> GetStudents(string filteredName)
        {
                students = dataManager.LoadStudentData(filteredName);
            foreach(Student student in students)
            {
                University uni;
                Department department;
                department = Dep_dataManager.LoadDepartment(student.DepartmentID);
                uni = Uni_dataManager.LoadUniversityName(student.UniID);
                StudentDetails detail = new StudentDetails(student.Id,student.Name,student.Gender,department.Name,uni.Name,student.PaymentMethod.GetDescription(),student.FinancialAid.AidType.GetDescription(student.FinancialAid.FinancierName));
                studentsDetails.Add(detail);
            }
            return studentsDetails;
        }
        public Student GetStudent(int id)
        {
            return  dataManager.LoadStudent(id);
        }

    }
}