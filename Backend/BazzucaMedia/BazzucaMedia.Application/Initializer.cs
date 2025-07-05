using BazzucaMedia.Domain.Impl.Core;
using BazzucaMedia.Domain.Impl.Factory;
using BazzucaMedia.Domain.Impl.Services;
using BazzucaMedia.Domain.Interfaces.Core;
using BazzucaMedia.Domain.Interfaces.Factory;
using BazzucaMedia.Domain.Interfaces.Models;
using BazzucaMedia.Domain.Interfaces.Services;
using Core.Domain;
using Core.Domain.Repository;
using DB.Infra;
using DB.Infra.Context;
using DB.Infra.Repository;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NAuth.Client;
using System;

namespace BazzucaMedia.Application
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
        public static void Configure(IServiceCollection services, ConfigurationParam config, bool scoped = true)
        {
            if (scoped)
                services.AddDbContext<BazzucaContext>(x => x.UseLazyLoadingProxies().UseNpgsql(config.ConnectionString));
            else
                services.AddDbContextFactory<BazzucaContext>(x => x.UseLazyLoadingProxies().UseNpgsql(config.ConnectionString));

            #region Infra
            injectDependency(typeof(BazzucaContext), typeof(BazzucaContext), services, scoped);
            injectDependency(typeof(IUnitOfWork), typeof(UnitOfWork), services, scoped);
            injectDependency(typeof(ILogCore), typeof(LogCore), services, scoped);
            #endregion

            #region Repository
            injectDependency(typeof(ISocialNetworkRepository<ISocialNetworkModel, ISocialNetworkDomainFactory>), typeof(SocialNetworkRepository), services, scoped);
            injectDependency(typeof(IPostRepository<IPostModel, IPostDomainFactory>), typeof(PostRepository), services, scoped);
            injectDependency(typeof(IClientRepository<IClientModel, IClientDomainFactory>), typeof(ClientRepository), services, scoped);
            #endregion

            #region Service
            injectDependency(typeof(IUserClient), typeof(UserClient), services, scoped);
            injectDependency(typeof(ISocialNetworkService), typeof(SocialNetworkService), services, scoped);
            injectDependency(typeof(IClientService), typeof(ClientService), services, scoped);
            injectDependency(typeof(IPostService), typeof(PostService), services, scoped);
            injectDependency(typeof(IS3Service), typeof(S3Service), services, scoped);
            injectDependency(typeof(ITwitterService), typeof(TwitterService), services, scoped);
            // Adicione aqui se houver um serviço para SocialNetwork
            #endregion

            #region Factory
            injectDependency(typeof(ISocialNetworkDomainFactory), typeof(SocialNetworkDomainFactory), services, scoped);
            injectDependency(typeof(IPostDomainFactory), typeof(PostDomainFactory), services, scoped);
            injectDependency(typeof(IClientDomainFactory), typeof(ClientDomainFactory), services, scoped);
            #endregion


            services.AddAuthentication("BasicAuthentication")
                .AddScheme<AuthenticationSchemeOptions, AuthHandler>("BasicAuthentication", null);

        }
    }
}
