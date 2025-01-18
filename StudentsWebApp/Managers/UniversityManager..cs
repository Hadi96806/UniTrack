using StudentsWebApp.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UniversitysWebApp.Managers;

namespace StudentsWebApp.Managers
{
    public class UniversityManager
    {
        List<University> Universitys = new List<University>();

        private UniversityDataManager dataManager;

        public UniversityManager(string connectionString)
        {
            dataManager = new UniversityDataManager(connectionString);

        }

        public void AddUniversity( string name)
        {
            // You can perform additional logic here if needed
            dataManager.AddUniversity( name);
        }
        public void UpdateUniversity(int id, string name)
        {
            dataManager.UpdateUniversity(id, name);
        }
        public List<University> GetUniversitys(string filteredName)
        {
            return Universitys = dataManager.LoadUniversityData(filteredName);
        } 
        public List<UniversityInfo> GetUniversitiesInfo(string filteredName)
        {
            return dataManager.LoadUniversitiesInfo(filteredName);
        }
        public University GetUniversity(int id)
        {
            return dataManager.LoadUniversityName(id);
        }
    }
}