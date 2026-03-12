using Bazzuca.Application.Interfaces;
using Bazzuca.Application.Services;
using Bazzuca.Domain.Interface;
using Bazzuca.Domain.Interface.Factory;
using Bazzuca.Domain.Interface.Models;
using Bazzuca.Domain.Interface.Services;
using Bazzuca.Infra;
using Bazzuca.Infra.Context;
using Bazzuca.Infra.Interface;
using Bazzuca.Infra.Interface.Repository;
using Bazzuca.Infra.Repository;
using Bazzuca.Infra.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NAuth.ACL;
using NAuth.ACL.Interfaces;
using System;

namespace Bazzuca.Application
{
    public static class Initializer
    {
        private static void injectDependency(Type serviceType, Type implementationType, IServiceCollection services, bool scoped = true)
        {
            if (scoped)
                services.AddScoped(serviceType, implementationType);
            else
                services.AddTransient(serviceType, implementationType);
        }
        public static void Configure(IServiceCollection services, IConfiguration configuration, bool scoped = true)
        {
            #region Multi-Tenant
            if (scoped)
            {
                // API: resolve DbContext per-request using tenant from X-Tenant-Id header or JWT claim
                services.AddHttpContextAccessor();
                services.AddScoped<ITenantContext, TenantContext>();
                services.AddScoped<BazzucaContext>(sp =>
                {
                    var tenantContext = sp.GetRequiredService<ITenantContext>();
                    var config = sp.GetRequiredService<IConfiguration>();
                    var tenantId = tenantContext.TenantId;
                    var connectionString = config[$"Tenants:{tenantId}:ConnectionString"]
                        ?? throw new InvalidOperationException(
                            $"ConnectionString not found for tenant '{tenantId}'. " +
                            $"Expected key: Tenants:{tenantId}:ConnectionString");

                    var optionsBuilder = new DbContextOptionsBuilder<BazzucaContext>();
                    optionsBuilder.UseLazyLoadingProxies().UseNpgsql(connectionString);
                    return new BazzucaContext(optionsBuilder.Options);
                });
            }
            else
            {
                // Worker: resolve DbContext using default tenant from config
                var defaultTenantId = configuration["Tenant:DefaultTenantId"]
                    ?? throw new InvalidOperationException(
                        "Tenant:DefaultTenantId is not configured.");
                var connection = configuration[$"Tenants:{defaultTenantId}:ConnectionString"]
                    ?? throw new InvalidOperationException(
                        $"ConnectionString not found for tenant '{defaultTenantId}'.");

                services.AddDbContextFactory<BazzucaContext>(x =>
                    x.UseLazyLoadingProxies().UseNpgsql(connection));
            }

            services.AddScoped<ITenantResolver, TenantResolver>();
            #endregion

            #region Infra
            injectDependency(typeof(IUnitOfWork), typeof(UnitOfWork), services, scoped);
            #endregion

            #region Repository
            injectDependency(typeof(ISocialNetworkRepository<ISocialNetworkModel, ISocialNetworkDomainFactory>), typeof(SocialNetworkRepository), services, scoped);
            injectDependency(typeof(IPostRepository<IPostModel, IPostDomainFactory>), typeof(PostRepository), services, scoped);
            injectDependency(typeof(IClientRepository<IClientModel, IClientDomainFactory>), typeof(ClientRepository), services, scoped);
            #endregion

            #region Service
            injectDependency(typeof(ISocialNetworkService), typeof(SocialNetworkService), services, scoped);
            injectDependency(typeof(IClientService), typeof(ClientService), services, scoped);
            injectDependency(typeof(IPostService), typeof(PostService), services, scoped);
            injectDependency(typeof(IS3Service), typeof(S3Service), services, scoped);
            injectDependency(typeof(ITwitterService), typeof(TwitterService), services, scoped);
            injectDependency(typeof(IXService), typeof(XService), services, scoped);
            injectDependency(typeof(IXTokenService), typeof(XTokenService), services, scoped);
            injectDependency(typeof(ILinkedinService), typeof(LinkedinService), services, scoped);
            injectDependency(typeof(ILinkedinAppService), typeof(LinkedinAppService), services, scoped);
            #endregion

            #region Factory
            injectDependency(typeof(ISocialNetworkDomainFactory), typeof(SocialNetworkDomainFactory), services, scoped);
            injectDependency(typeof(IPostDomainFactory), typeof(PostDomainFactory), services, scoped);
            injectDependency(typeof(IClientDomainFactory), typeof(ClientDomainFactory), services, scoped);
            #endregion

            injectDependency(typeof(IUserClient), typeof(UserClient), services, scoped);

            // Singleton services
            services.AddSingleton<IRabbitAppService, RabbitAppService>();
            services.AddSingleton<ITenantDbContextFactory, TenantDbContextFactory>();

            services.AddAuthentication("BasicAuthentication")
                .AddScheme<AuthenticationSchemeOptions, NAuthHandler>("BasicAuthentication", null);
        }
    }
}
