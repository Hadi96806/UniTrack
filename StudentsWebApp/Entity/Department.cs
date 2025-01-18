using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentsWebApp.Entity
{
    public class Department
    {
        //public Department(int id, string name, int universityId)
        //{
        //    Id = id;
        //    Name = name;
        //    UniversityId = universityId;
        //}
    
        public int Id { get; set; }
        public string Name { get; set; }
        public int UniversityId { get; set; }
    }
}