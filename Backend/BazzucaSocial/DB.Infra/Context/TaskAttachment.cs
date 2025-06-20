using System;
using System.Collections.Generic;

namespace DB.Infra.Context;

public partial class TaskAttachment
{
    public long AttachmentId { get; set; }

    public long CommentId { get; set; }

    public long UserId { get; set; }

    public string Filename { get; set; }

    public virtual TaskComment Comment { get; set; }
}
