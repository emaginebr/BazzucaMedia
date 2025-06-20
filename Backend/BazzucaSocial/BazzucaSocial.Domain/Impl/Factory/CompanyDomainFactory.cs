using Core.Domain;
using Core.Domain.Repository;
using BazzucaSocial.Domain.Impl.Models;
using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.Domain.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BazzucaSocial.Domain.Impl.Factory
{
    public class CompanyDomainFactory : ICompanyDomainFactory
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICompanyRepository<ICompanyModel, ICompanyDomainFactory> _repositoryCompany;

        public CompanyDomainFactory(IUnitOfWork unitOfWork, ICompanyRepository<ICompanyModel, ICompanyDomainFactory> repositoryCompany)
        {
            _unitOfWork = unitOfWork;
            _repositoryCompany = repositoryCompany;
        }

        public ICompanyModel BuildCompanyModel()
        {
            return new CompanyModel(_unitOfWork, _repositoryCompany);
        }
    }
}
