namespace Bazzuca.DTO.Queue
{
    public class QueueSettings
    {
        public string Msg { get; set; }
        public string Retry { get; set; }
        public string Error { get; set; }
        public int MaxRetryCount { get; set; }
        public int RetryTtlMs { get; set; }
    }
}
