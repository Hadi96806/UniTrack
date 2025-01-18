using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentsWebApp.Payment
{
    public class BankMethod : PaymentMethod
    {
        public string BankName { get; set; }

        public override string GetDescription()
        {
            return $"{Amount} From {BankName}";
        }
    }

}