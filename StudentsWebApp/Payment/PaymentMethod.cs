using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentsWebApp.Payment
{
    public abstract class PaymentMethod
    {
        public decimal Amount { get; set; }

        public abstract string GetDescription();
    }

}