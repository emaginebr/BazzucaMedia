using Bazzuca.Application.Interfaces;
using Bazzuca.Infra.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;

namespace Bazzuca.Application.Services
{
    public class TenantDbContextFactory : ITenantDbContextFactory
    {
        private readonly IConfiguration _configuration;

        public TenantDbContextFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public BazzucaContext CreateForTenant(string tenantId)
        {
            var connectionString = _configuration[$"Tenants:{tenantId}:ConnectionString"]
                ?? throw new InvalidOperationException(
                    $"ConnectionString not found for tenant '{tenantId}'.");

            var optionsBuilder = new DbContextOptionsBuilder<BazzucaContext>();
            optionsBuilder.UseLazyLoadingProxies().UseNpgsql(connectionString);
            return new BazzucaContext(optionsBuilder.Options);
        }
    }
}
