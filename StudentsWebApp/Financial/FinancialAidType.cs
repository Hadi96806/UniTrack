using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentsWebApp.Financial
{
    public abstract class FinancialAidType
    {
        public abstract string GetDescription(object FinancierName);
    }
}