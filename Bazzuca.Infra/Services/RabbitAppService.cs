using Bazzuca.DTO.Queue;
using Bazzuca.Infra.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Bazzuca.Infra.Services
{
    public class RabbitAppService : IRabbitAppService
    {
        private readonly IConnection _connection;
        private readonly IChannel _channel;
        private readonly ILogger<RabbitAppService> _logger;

        public RabbitAppService(IConfiguration configuration, ILogger<RabbitAppService> logger)
        {
            _logger = logger;

            var factory = new ConnectionFactory
            {
                HostName = configuration["RabbitMQ:HostName"] ?? "localhost",
                Port = int.Parse(configuration["RabbitMQ:Port"] ?? "5672"),
                UserName = configuration["RabbitMQ:UserName"] ?? "guest",
                Password = configuration["RabbitMQ:Password"] ?? "guest",
                AutomaticRecoveryEnabled = true
            };

            _connection = factory.CreateConnectionAsync().GetAwaiter().GetResult();
            _channel = _connection.CreateChannelAsync().GetAwaiter().GetResult();
        }

        public void DeclareTopology(string exchangeName, QueueSettings settings)
        {
            // Main exchange and queue
            var mainExchange = $"{exchangeName}.exchange";
            _channel.ExchangeDeclareAsync(mainExchange, ExchangeType.Direct, durable: true).GetAwaiter().GetResult();
            _channel.QueueDeclareAsync(settings.Msg, durable: true, exclusive: false, autoDelete: false).GetAwaiter().GetResult();
            _channel.QueueBindAsync(settings.Msg, mainExchange, routingKey: "").GetAwaiter().GetResult();

            // Retry exchange and queue (with TTL + dead-letter back to main)
            var retryExchange = $"{exchangeName}.retry.exchange";
            _channel.ExchangeDeclareAsync(retryExchange, ExchangeType.Direct, durable: true).GetAwaiter().GetResult();

            var retryArgs = new Dictionary<string, object>
            {
                { "x-message-ttl", settings.RetryTtlMs },
                { "x-dead-letter-exchange", mainExchange }
            };
            _channel.QueueDeclareAsync(settings.Retry, durable: true, exclusive: false, autoDelete: false, arguments: retryArgs).GetAwaiter().GetResult();
            _channel.QueueBindAsync(settings.Retry, retryExchange, routingKey: "").GetAwaiter().GetResult();

            // Error exchange and queue (DLQ)
            var errorExchange = $"{exchangeName}.error.exchange";
            _channel.ExchangeDeclareAsync(errorExchange, ExchangeType.Direct, durable: true).GetAwaiter().GetResult();
            _channel.QueueDeclareAsync(settings.Error, durable: true, exclusive: false, autoDelete: false).GetAwaiter().GetResult();
            _channel.QueueBindAsync(settings.Error, errorExchange, routingKey: "").GetAwaiter().GetResult();

            _logger.LogInformation("RabbitMQ topology declared for {Exchange}", exchangeName);
        }

        public void Publish(string exchange, byte[] body, IDictionary<string, object> headers)
        {
            var props = new BasicProperties
            {
                Persistent = true,
                Headers = headers
            };
            _channel.BasicPublishAsync(exchange, routingKey: "", mandatory: false, basicProperties: props, body: body).GetAwaiter().GetResult();
        }

        public void PublishToRetry(string retryExchange, byte[] body, IDictionary<string, object> headers)
        {
            Publish(retryExchange, body, headers);
        }

        public void PublishToError(string errorExchange, byte[] body, IDictionary<string, object> headers)
        {
            Publish(errorExchange, body, headers);
        }

        public void StartConsuming(string queueName, Func<byte[], IDictionary<string, object>, Task> handler)
        {
            _channel.BasicQosAsync(prefetchSize: 0, prefetchCount: 1, global: false).GetAwaiter().GetResult();

            var consumer = new AsyncEventingBasicConsumer(_channel);
            consumer.ReceivedAsync += async (sender, ea) =>
            {
                try
                {
                    var headers = ea.BasicProperties.Headers ?? new Dictionary<string, object>();
                    await handler(ea.Body.ToArray(), headers);
                    await _channel.BasicAckAsync(ea.DeliveryTag, multiple: false);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error processing message from {Queue}", queueName);
                    await _channel.BasicAckAsync(ea.DeliveryTag, multiple: false);
                }
            };

            _channel.BasicConsumeAsync(queueName, autoAck: false, consumer: consumer).GetAwaiter().GetResult();
            _logger.LogInformation("Started consuming from {Queue}", queueName);
        }

        public void Dispose()
        {
            _channel?.Dispose();
            _connection?.Dispose();
        }
    }
}
