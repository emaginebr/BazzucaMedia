using Bazzuca.Domain.Interface;
using Bazzuca.Domain.Interface.Factory;
using Bazzuca.Domain.Interface.Models;
using Bazzuca.Domain.Interface.Services;
using Bazzuca.Infra;
using Bazzuca.Infra.Context;
using Bazzuca.Infra.Interface;
using Bazzuca.Infra.Interface.Repository;
using Bazzuca.Infra.Repository;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
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
        public static void Configure(IServiceCollection services, string connection, bool scoped = true)
        {
            if (scoped)
                services.AddDbContext<BazzucaContext>(x => x.UseLazyLoadingProxies().UseNpgsql(connection));
            else
                services.AddDbContextFactory<BazzucaContext>(x => x.UseLazyLoadingProxies().UseNpgsql(connection));

            #region Infra
            injectDependency(typeof(BazzucaContext), typeof(BazzucaContext), services, scoped);
            injectDependency(typeof(IUnitOfWork), typeof(UnitOfWork), services, scoped);
            //injectDependency(typeof(ILogger), typeof(Logger), services, scoped);
            #endregion

            #region Repository
            injectDependency(typeof(ISocialNetworkRepository<ISocialNetworkModel, ISocialNetworkDomainFactory>), typeof(SocialNetworkRepository), services, scoped);
            injectDependency(typeof(IPostRepository<IPostModel, IPostDomainFactory>), typeof(PostRepository), services, scoped);
            injectDependency(typeof(IClientRepository<IClientModel, IClientDomainFactory>), typeof(ClientRepository), services, scoped);
            #endregion

            #region Service
            //injectDependency(typeof(IUserClient), typeof(UserClient), services, scoped);
            injectDependency(typeof(ISocialNetworkService), typeof(SocialNetworkService), services, scoped);
            injectDependency(typeof(IClientService), typeof(ClientService), services, scoped);
            injectDependency(typeof(IPostService), typeof(PostService), services, scoped);
            injectDependency(typeof(IS3Service), typeof(S3Service), services, scoped);
            injectDependency(typeof(ITwitterService), typeof(TwitterService), services, scoped);
            injectDependency(typeof(IXService), typeof(XService), services, scoped);
            injectDependency(typeof(IXTokenService), typeof(XTokenService), services, scoped);
            // Adicione aqui se houver um serviço para SocialNetwork
            #endregion

            #region Factory
            injectDependency(typeof(ISocialNetworkDomainFactory), typeof(SocialNetworkDomainFactory), services, scoped);
            injectDependency(typeof(IPostDomainFactory), typeof(PostDomainFactory), services, scoped);
            injectDependency(typeof(IClientDomainFactory), typeof(ClientDomainFactory), services, scoped);
            #endregion

            injectDependency(typeof(IUserClient), typeof(UserClient), services, scoped);


                services.AddAuthentication("BasicAuthentication")
                    .AddScheme<AuthenticationSchemeOptions, NAuthHandler>("BasicAuthentication", null);

        }
    }
}
