using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.DTO.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BazzucaSocial.Domain.Interfaces.Models
{
    public interface ICompanyModel
    {
        long CompanyId { get; set; }

        string Name { get; set; }

        int SlaMin { get; set; }

        PlanEnum Plan { get; set; }

        CompanyStatusEnum Status { get; set; }

        IEnumerable<ICompanyModel> ListByUser(long userId, int take, ICompanyDomainFactory factory);
        ICompanyModel GetById(long companyId, ICompanyDomainFactory factory);
        ICompanyModel Insert(ICompanyDomainFactory factory);
        ICompanyModel Update(ICompanyDomainFactory factory);
    }
}
