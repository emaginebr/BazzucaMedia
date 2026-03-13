using Bazzuca.DTO.Queue;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Bazzuca.Infra.Interface
{
    public interface IRabbitAppService : IDisposable
    {
        void DeclareTopology(QueueSettings settings);
        void Publish(string exchange, byte[] body, IDictionary<string, object> headers);
        void PublishToRetry(string retryExchange, byte[] body, IDictionary<string, object> headers);
        void PublishToError(string errorExchange, byte[] body, IDictionary<string, object> headers);
        void StartConsuming(string queueName, Func<byte[], IDictionary<string, object>, Task> handler);
    }
}
