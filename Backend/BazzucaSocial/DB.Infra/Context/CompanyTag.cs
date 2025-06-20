using System;
using System.Collections.Generic;

namespace DB.Infra.Context;

public partial class CompanyTag
{
    public long TagId { get; set; }

    public long CompanyId { get; set; }

    public string Name { get; set; }

    public string Color { get; set; }

    public virtual Company Company { get; set; }

    public virtual ICollection<TaskTag> TaskTags { get; set; } = new List<TaskTag>();
}
