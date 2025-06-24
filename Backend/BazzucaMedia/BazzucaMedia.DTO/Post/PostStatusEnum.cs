using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BazzucaMedia.DTO.Post
{
    public enum PostStatusEnum
    {
        Draft = 1,
        Scheduled = 2,
        ScheduredOnNetwork = 3,
        Posted = 4,
        Canceled = 5
    }
}
