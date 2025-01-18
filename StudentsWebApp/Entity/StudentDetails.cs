using StudentsWebApp.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentsWebApp.Entity
{
    public class StudentDetails
    {
        public StudentDetails(int id, string name, GenderEnum gender, string departmentName, string uniName, string paymentMethod, string financialAid)
        {
            Id = id;
            Name = name;
            Gender = gender;
            DepartmentName = departmentName;
            UniName = uniName;
            PaymentMethod = paymentMethod;
            FinancialAid = financialAid;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public GenderEnum Gender { get; set; }
        public string DepartmentName { get; set; }
        public string UniName { get; set; }
        public string PaymentMethod { get; set; }
        public string FinancialAid { get; set; }

    }

}