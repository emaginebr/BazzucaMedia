using System;
using System.Collections.Generic;

namespace DB.Infra.Context;

public partial class Company
{
    public long CompanyId { get; set; }

    public string Name { get; set; }

    public int SlaMin { get; set; }

    public int Plan { get; set; }

    public int Status { get; set; }

    public virtual ICollection<CompanyPriority> CompanyPriorities { get; set; } = new List<CompanyPriority>();

    public virtual ICollection<CompanyTag> CompanyTags { get; set; } = new List<CompanyTag>();

    public virtual ICollection<CompanyUser> CompanyUsers { get; set; } = new List<CompanyUser>();

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
