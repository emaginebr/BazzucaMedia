using System;
using System.Collections.Generic;

namespace DB.Infra.Context;

public partial class CompanyPriority
{
    public long PriorityId { get; set; }

    public long CompanyId { get; set; }

    public string Name { get; set; }

    public string Color { get; set; }

    public int FulfillTime { get; set; }

    public virtual Company Company { get; set; }

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
