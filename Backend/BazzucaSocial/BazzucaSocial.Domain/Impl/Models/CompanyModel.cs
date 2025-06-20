using Core.Domain;
using Core.Domain.Repository;
using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.Domain.Interfaces.Models;
using BazzucaSocial.DTO.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BazzucaSocial.Domain.Impl.Models
{
    public class CompanyModel : ICompanyModel
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICompanyRepository<ICompanyModel, ICompanyDomainFactory> _repositoryCompany;

        public CompanyModel(IUnitOfWork unitOfWork, ICompanyRepository<ICompanyModel, ICompanyDomainFactory> repositoryCompany)
        {
            _unitOfWork = unitOfWork;
            _repositoryCompany = repositoryCompany;
        }

        public long CompanyId { get; set; }
        public string Name { get; set; }
        public int SlaMin { get; set; }
        public PlanEnum Plan { get; set; }
        public CompanyStatusEnum Status { get; set; }

        public IEnumerable<ICompanyModel> ListByUser(long userId, int take, ICompanyDomainFactory factory)
        {
            return _repositoryCompany.ListByUser(userId, take, factory);
        }
        public ICompanyModel GetById(long companyId, ICompanyDomainFactory factory)
        {
            return _repositoryCompany.GetById(companyId, factory);
        }

        public ICompanyModel Insert(ICompanyDomainFactory factory)
        {
            return _repositoryCompany.Insert(this, factory);
        }

        public ICompanyModel Update(ICompanyDomainFactory factory)
        {
            return _repositoryCompany.Update(this, factory);
        }
    }
}
