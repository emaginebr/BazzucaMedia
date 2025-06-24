using System;
using System.Collections.Generic;

namespace DB.Infra.Context;

public partial class SocialNetwork
{
    public long NetworkId { get; set; }

    public long ClientId { get; set; }

    public int NetworkKey { get; set; }

    public string Url { get; set; }

    public string User { get; set; }

    public string Password { get; set; }

    public bool Active { get; set; }

    public virtual Client Client { get; set; }

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
}
