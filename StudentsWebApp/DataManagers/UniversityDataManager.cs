using StudentsWebApp.Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using StudentsWebApp.Managers;
using TsWebApp.Managers;

namespace UniversitysWebApp.Managers
{
    public class UniversityDataManager: BaseDataManager
    {
        string connectionString;

        public List<University> LoadUniversityData(string searchName)
        {
            return GetSPItems("SearchUniByName", mapFunction, searchName);
        } 
        public List<UniversityInfo> LoadUniversitiesInfo(string searchName)
        {
            return GetSPItems("SearchUniByName", mapFunction1, searchName);
        }
        Func<SqlDataReader, University> mapFunction = (reader) =>
        {
      

            return new University
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),

            };
        };
        Func<SqlDataReader, UniversityInfo> mapFunction1 = (reader) =>
        {
      

            return new UniversityInfo
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),

            };
        };
        public University LoadUniversityName(int Id)
        {
            List<University> Universities = new List<University>();
            Universities = GetSPItems("SearchById", mapFunction, Id);
            // Call the GetSPItems function with the single parameter
            return Universities[0];
        }



        public void AddUniversity(string name)
        {

            int rows = ExecuteNonQuery("InsertUni",  name);
        }
        public void UpdateUniversity(int id, string name)
        {


            int rows = ExecuteNonQuery("UpdateUni", id, name);
        }
        public UniversityDataManager(string connectionString)
        {
            this.connectionString = connectionString;
        }
    }
}