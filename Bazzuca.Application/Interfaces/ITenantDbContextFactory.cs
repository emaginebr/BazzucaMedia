using Bazzuca.Infra.Context;

namespace Bazzuca.Application.Interfaces
{
    public interface ITenantDbContextFactory
    {
        BazzucaContext CreateForTenant(string tenantId);
    }
}
