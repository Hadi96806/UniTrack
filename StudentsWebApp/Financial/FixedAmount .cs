using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using StudentsWebApp.Payment;
using StudentsWebApp.Financial;
namespace StudentsWebApp.Financial
{
    public class FixedAmount : FinancialAidType
    {
        public decimal AidValue { get; set; }
        public Currency CurrencyId { get; set; }

        // Implementing abstract method
        public override string GetDescription(object FinancierName)
        {
            return $"Financier: {FinancierName}, Aid Value: {AidValue} {CurrencyId}";
        }
    }
}