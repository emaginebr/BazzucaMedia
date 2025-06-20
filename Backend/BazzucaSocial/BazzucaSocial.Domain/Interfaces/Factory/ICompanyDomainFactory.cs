using BazzucaSocial.Domain.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BazzucaSocial.Domain.Interfaces.Factory
{
    public interface ICompanyDomainFactory
    {
        ICompanyModel BuildCompanyModel();
    }
}
