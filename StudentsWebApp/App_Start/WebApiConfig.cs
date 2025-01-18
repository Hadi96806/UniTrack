using Newtonsoft.Json;
using StudentsWebApp.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace StudentsWebApp
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // JSON serialization settings
            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings.TypeNameHandling = Newtonsoft.Json.TypeNameHandling.Objects;
            json.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Unspecified;

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

    }
}

