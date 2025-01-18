using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentsWebApp.Financial
{
    public class Percentage : FinancialAidType
    {
        public int PercentageValue { get; set; }

        // Implementing abstract method
        public override string GetDescription(object FinancierName)
        {
            return $"Financier: {FinancierName}, Percentage: {PercentageValue}%";
        }
    }
}