using System;

namespace DB.Infra.Context;

public partial class Post
{
    public long PostId { get; set; }

    public long NetworkId { get; set; }

    public long ClientId { get; set; }

    public DateTime ScheduleDate { get; set; }

    public int PostType { get; set; }

    public string S3Key { get; set; }

    public string Title { get; set; }

    public int Status { get; set; }

    public string Description { get; set; }

    public virtual Client Client { get; set; }

    public virtual SocialNetwork Network { get; set; }
}
