using System;
using System.Collections.Generic;

namespace Bazzuca.Infra.Context;

public partial class Client
{
    public long ClientId { get; set; }

    public long UserId { get; set; }

    public string Name { get; set; }

    public bool Active { get; set; }

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual ICollection<SocialNetwork> SocialNetworks { get; set; } = new List<SocialNetwork>();
}
