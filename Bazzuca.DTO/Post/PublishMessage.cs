namespace Bazzuca.DTO.Post
{
    public class PublishMessage
    {
        public long PostId { get; set; }
        public long ClientId { get; set; }
        public long NetworkId { get; set; }
        public string TenantId { get; set; }
    }
}
