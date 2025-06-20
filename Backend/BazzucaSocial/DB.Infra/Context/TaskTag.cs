using System;
using System.Collections.Generic;

namespace DB.Infra.Context;

public partial class TaskTag
{
    public long TtagId { get; set; }

    public long TaskId { get; set; }

    public long TagId { get; set; }

    public virtual CompanyTag Tag { get; set; }

    public virtual Task Task { get; set; }
}
