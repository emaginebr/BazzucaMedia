using Core.Domain;
using Core.Domain.Cloud;
using Core.Domain.Repository;
using DB.Infra;
using DB.Infra.Context;
using DB.Infra.Repository;
using BazzucaSocial.Domain.Impl.Core;
using BazzucaSocial.Domain.Impl.Factory;
using BazzucaSocial.Domain.Impl.Services;
using BazzucaSocial.Domain.Interfaces.Core;
using BazzucaSocial.Domain.Interfaces.Factory;
using BazzucaSocial.Domain.Interfaces.Models;
using BazzucaSocial.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using BazzucaSocial.Domain;
using NAuth.Client;

namespace BazzucaSocial.Application
{
    public static class Initializer
    {

        private static void injectDependency(Type serviceType, Type implementationType, IServiceCollection services, bool scoped = true)
        {
            if(scoped)
                services.AddScoped(serviceType, implementationType);
            else
                services.AddTransient(serviceType, implementationType);
        }
        public static void Configure(IServiceCollection services, ConfigurationParam config, bool scoped = true)
        {
            if (scoped)
                services.AddDbContext<EasySLAContext>(x => x.UseLazyLoadingProxies().UseNpgsql(config.ConnectionString));
            else
                services.AddDbContextFactory<EasySLAContext>(x => x.UseLazyLoadingProxies().UseNpgsql(config.ConnectionString));

            #region Infra
            injectDependency(typeof(EasySLAContext), typeof(EasySLAContext), services, scoped);
            injectDependency(typeof(IUnitOfWork), typeof(UnitOfWork), services, scoped);
            injectDependency(typeof(ILogCore), typeof(LogCore), services, scoped);
            #endregion

            #region Repository
            injectDependency(typeof(ICompanyRepository<ICompanyModel, ICompanyDomainFactory>), typeof(CompanyRepository), services, scoped);
            injectDependency(typeof(ISocialNetworkRepository<ISocialNetworkModel, ISocialNetworkDomainFactory>), typeof(SocialNetworkRepository), services, scoped);
            injectDependency(typeof(IPostRepository<IPostModel, IPostDomainFactory>), typeof(PostRepository), services, scoped);
            #endregion

            #region Service
            injectDependency(typeof(IUserClient), typeof(UserClient), services, scoped);
            injectDependency(typeof(ICompanyService), typeof(CompanyService), services, scoped);
            // Adicione aqui se houver um serviço para SocialNetwork
            #endregion

            #region Factory
            injectDependency(typeof(ICompanyDomainFactory), typeof(CompanyDomainFactory), services, scoped);
            injectDependency(typeof(ISocialNetworkDomainFactory), typeof(SocialNetworkDomainFactory), services, scoped);
            injectDependency(typeof(IPostDomainFactory), typeof(PostDomainFactory), services, scoped);
            #endregion


            services.AddAuthentication("BasicAuthentication")
                .AddScheme<AuthenticationSchemeOptions, AuthHandler>("BasicAuthentication", null);

        }
    }
}
