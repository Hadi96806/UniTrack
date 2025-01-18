using StudentsWebApp.Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;

namespace TsWebApp.Managers
{
    public abstract class BaseDataManager
    {
        private string connectionString = "Data Source=MH2009\\SQLEXPRESS;Initial Catalog=Students;Integrated Security=True"; // Your SQL Server connection string

        public List<T> GetSPItems<T>(string storedProcedureName, Func<SqlDataReader, T> mapFunction, params SqlParameter[] parameters)
        {
            List<T> items = new List<T>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(storedProcedureName, connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddRange(parameters);
                connection.Open();

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        T item = mapFunction(reader);
                        items.Add(item);
                    }
                }
            }

            return items;
        }
        public List<T> GetSPItems<T>(string storedProcedureName, Func<SqlDataReader, T> mapFunction, params object[] parameterValues)
        {
            List<T> items = new List<T>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(storedProcedureName, connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    // Derive parameters and add them to the command
                     SqlCommandBuilder.DeriveParameters(command);
                    for (int i = 1; i < command.Parameters.Count; i++)
                    {
                        // Assuming your array has values in the same order as parameters
                        command.Parameters[i].Value = parameterValues[i - 1];
                    }
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            T item = mapFunction(reader);
                            items.Add(item);
                        }
                    }
                }
            }
            return items;
        }
        public int ExecuteNonQuery(string storedProcedureName,params object[] parameters)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); // Open the connection

                using (SqlCommand command = new SqlCommand(storedProcedureName, connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Derive parameters based on the stored procedure definition
                    SqlCommandBuilder.DeriveParameters(command);

                    // Assign values to the derived parameters
                    for (int i = 1; i < command.Parameters.Count; i++)
                    {
                        // Assuming your array has values in the same order as parameters
                        command.Parameters[i].Value = parameters[i - 1];
                    }

                    int rowsAffected = command.ExecuteNonQuery();

                    connection.Close(); // Close the connection

                    return rowsAffected;
                }
            }
        }

    }
}