using System;
using System.Collections.Generic;

namespace DB.Infra.Context;

public partial class Task
{
    public long TaskId { get; set; }

    public long CompanyId { get; set; }

    public long PriorityId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public string Name { get; set; }

    public int Status { get; set; }

    public virtual Company Company { get; set; }

    public virtual CompanyPriority Priority { get; set; }

    public virtual ICollection<TaskComment> TaskComments { get; set; } = new List<TaskComment>();

    public virtual ICollection<TaskLog> TaskLogs { get; set; } = new List<TaskLog>();

    public virtual ICollection<TaskTag> TaskTags { get; set; } = new List<TaskTag>();
}
