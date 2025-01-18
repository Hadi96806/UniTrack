using System.Web;
using System.Web.Optimization;

namespace StudentsWebApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new Bundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      //"~/Content/bootstrap.css",
                      "~/Content/site.css"));
            bundles.Add(new ScriptBundle("~/bundles/MyJs").Include(
                 "~/MyAngularApp/MyApp.js" ,
         "~/MyViews/Student/StudentController.js" ,
         "~/MyServices/APIServices/StudentWebApiService.js" ,
         "~/MyServices/APIServices/WebApiService.js" ,
         "~/MyServices/StudentService.js" ,
         "~/MyServices/ModalService.js" ,
         "~/MyViews/Student/StudentEditorController.js" ,
         "~/MyServices/PaginationService.js" ,
         "~/MyViews/University/UniversityController.js" ,
         "~/MyServices/APIServices/UniversityWebApiService.js" ,
         "~/MyServices/Universitieservice.js" ,
         "~/MyViews/University/UniversityEditorController.js" ,
         "~/MyViews/Department/DepartmentController.js" ,
         "~/MyServices/APIServices/DepartmentWebApiService.js" ,
         "~/MyServices/DepartmentService.js" ,
         "~/MyViews/Department/DepartmentEditorController.js",
         "~/Entity/GenderEnum.js",
         "~/MyDirectives/GenderSelectorDirective.js",
         "~/MyDirectives/UniversitySelectorDirective.js",
         "~/MyDirectives/DepartmentSelectorDirective.js",
         "~/MyDirectives/PaymentMethodDirective.js",
         "~/MyDirectives/CashMethodDirective.js",
         "~/MyDirectives/BankMethodDirective.js",   
         "~/MyDirectives/DepartmentGridDirective.js",
         "~/Entity/CurrencyEnum.js",
         "~/MyDirectives/CurrencySelector.js",
         "~/MyDirectives/FinancialAid.js",
         "~/MyDirectives/Percentage.js",
         "~/MyDirectives/FixedAmount.js"

         ));
        }
    }
}
