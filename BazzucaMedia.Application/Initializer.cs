using BazzucaMedia.Domain.Interface;
using BazzucaMedia.Domain.Interface.Factory;
using BazzucaMedia.Domain.Interface.Models;
using BazzucaMedia.Domain.Interface.Services;
using BazzucaMedia.Infra;
using BazzucaMedia.Infra.Context;
using BazzucaMedia.Infra.Interface;
using BazzucaMedia.Infra.Interface.Repository;
using BazzucaMedia.Infra.Repository;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NAuth.ACL;
using NAuth.ACL.Interfaces;
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
                    .AddScheme<AuthenticationSchemeOptions, RemoteAuthHandler>("BasicAuthentication", null);

        }
    }
}
