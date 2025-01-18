using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using StudentsWebApp.Payment;
using StudentsWebApp.Financial;

namespace StudentsWebApp.Entity
{
    public class Student
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public GenderEnum Gender { get; set; }
        public int DepartmentID { get; set; }
        public int UniID { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public FinancialAid FinancialAid { get; set; }
    }
    public enum GenderEnum
    {
        Male = 1,
        Female = 2
    }
}
