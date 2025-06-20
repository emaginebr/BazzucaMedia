using System;
using System.Collections.Generic;

namespace DB.Infra.Context;

public partial class CompanyUser
{
    public long CuserId { get; set; }

    public long CompanyId { get; set; }

    public long? UserId { get; set; }

    public int Profile { get; set; }

    public string InviteHash { get; set; }

    public virtual Company Company { get; set; }
}
