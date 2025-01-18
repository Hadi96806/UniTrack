using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentsWebApp.Payment
{

    public class CashMethod : PaymentMethod
    {
        public Currency Currency { get; set; }

        public override string GetDescription()
        {
            return $"{Amount} {Currency}";
        }
    }
    public enum Currency
    {
        LBP,
        USD
    }

}