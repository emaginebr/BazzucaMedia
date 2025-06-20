using System;
using System.Collections.Generic;

namespace DB.Infra.Context;

public partial class TaskComment
{
    public long CommentId { get; set; }

    public long TaskId { get; set; }

    public long UserId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public string Comment { get; set; }

    public virtual Task Task { get; set; }

    public virtual ICollection<TaskAttachment> TaskAttachments { get; set; } = new List<TaskAttachment>();

    public virtual ICollection<TaskLog> TaskLogs { get; set; } = new List<TaskLog>();
}
