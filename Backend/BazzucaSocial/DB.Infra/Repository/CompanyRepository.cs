using Core.Domain.Repository;
using DB.Infra.Context;
using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.Domain.Interfaces.Models;
using BazzucaSocial.DTO.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Infra.Repository
{
    public class CompanyRepository : ICompanyRepository<ICompanyModel, ICompanyDomainFactory>
    {
        private EasySLAContext _ccsContext;

        public CompanyRepository(EasySLAContext ccsContext)
        {
            _ccsContext = ccsContext;
        }

        private ICompanyModel DbToModel(ICompanyDomainFactory factory, Company row)
        {
            var md = factory.BuildCompanyModel();
            md.CompanyId = row.CompanyId;
            md.Name = row.Name;
            md.SlaMin = row.SlaMin;
            md.Plan = (PlanEnum) row.Plan;
            md.Status = (CompanyStatusEnum) row.Status;
            return md;
        }

        private void ModelToDb(ICompanyModel md, Company row)
        {
            row.CompanyId = md.CompanyId;
            row.Name = md.Name;
            row.SlaMin = md.SlaMin;
            row.Plan = (int) md.Plan;
            row.Status = (int) md.Status;
        }

        public IEnumerable<ICompanyModel> ListByUser(long userId, int take, ICompanyDomainFactory factory)
        {
            var rows = _ccsContext.Companies
                .Where(x => x.CompanyUsers.Where(y => y.UserId == userId).Any())
                .OrderBy(x => x.Name)
                .Take(take)
                .ToList();
            return rows.Select(x => DbToModel(factory, x));
        }

        public ICompanyModel GetById(long companyId, ICompanyDomainFactory factory)
        {
            var row = _ccsContext.Companies.Find(companyId);
            if (row == null)
                return null;
            return DbToModel(factory, row);
        }

        public ICompanyModel Insert(ICompanyModel model, ICompanyDomainFactory factory)
        {
            var u = new Company();
            ModelToDb(model, u);
            _ccsContext.Add(u);
            _ccsContext.SaveChanges();
            model.CompanyId = u.CompanyId;
            return model;
        }

        public ICompanyModel Update(ICompanyModel model, ICompanyDomainFactory factory)
        {
            var row = _ccsContext.Companies.Where(x => x.CompanyId == model.CompanyId).FirstOrDefault();
            ModelToDb(model, row);
            _ccsContext.Companies.Update(row);
            _ccsContext.SaveChanges();
            return model;
        }
    }
}
