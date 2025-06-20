using System;
using System.Collections.Generic;

namespace DB.Infra.Context;

public partial class TaskLog
{
    public long LogId { get; set; }

    public long UserId { get; set; }

    public long TaskId { get; set; }

    public long? CommentId { get; set; }

    public DateTime CreatedAt { get; set; }

    public string Message { get; set; }

    public virtual TaskComment Comment { get; set; }

    public virtual Task Task { get; set; }
}
