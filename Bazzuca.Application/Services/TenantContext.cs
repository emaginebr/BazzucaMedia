using Bazzuca.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System;

namespace Bazzuca.Application.Services
{
    public class TenantContext : ITenantContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TenantContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string TenantId
        {
            get
            {
                var context = _httpContextAccessor.HttpContext;
                if (context == null)
                    throw new InvalidOperationException("No active HTTP context.");

                // Authenticated: resolve from JWT claim
                var claimTenant = context.User?.FindFirst("tenant_id")?.Value;
                if (!string.IsNullOrEmpty(claimTenant))
                    return claimTenant;

                // Unauthenticated: resolve from middleware-set item
                if (context.Items.TryGetValue("TenantId", out var headerTenant)
                    && headerTenant is string tenantStr
                    && !string.IsNullOrEmpty(tenantStr))
                    return tenantStr;

                throw new InvalidOperationException(
                    "TenantId could not be resolved from JWT claim or X-Tenant-Id header.");
            }
        }
    }
}
