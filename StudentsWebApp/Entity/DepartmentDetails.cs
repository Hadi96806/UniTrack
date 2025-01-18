using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentsWebApp.Entity
{
    public class DepartmentDetails
    {
        public DepartmentDetails(int id, string name1, string name2)
        {
            Id = id;
            Name = name1;
            UniversityName = name2;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string UniversityName { get; set; }

    }
}