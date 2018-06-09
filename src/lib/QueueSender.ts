import * as Amqp from "amqp-ts";

class QueueSender {
  public brokerUrl: string;
  public exchangeName: string;
  public queueName: string;
  public connection: Amqp.Connection;
  public exchange: Amqp.Exchange;
  public queue: Amqp.Queue;

  constructor(brokerUrl: string, exchangeName: string, queueName: string) {
    this.brokerUrl = brokerUrl;
    this.exchangeName = exchangeName;
    this.queueName = queueName;
    this.setup();
  }

  private setup() {
    this.connection = new Amqp.Connection(this.brokerUrl);
    this.exchange = this.connection.declareExchange(this.exchangeName);
    this.queue = this.connection.declareQueue(this.queueName);
    this.queue.bind(this.exchange);
    // loopback test
    this.queue.activateConsumer(message => {
      console.log("Message received: " + message.getContent());
      message.ack();
    });
  }

  async send(message: object) {
    try {
      await this.connection.completeConfiguration();
      const msg: Amqp.Message = new Amqp.Message(
        Buffer.from(JSON.stringify(message))
      );
      this.exchange.send(msg);
    } catch (error) {
      console.error("[ERROR] Failed to send message!");
    }
  }
}

export default new QueueSender(
  process.env.AMQP_BROKER_URL,
  process.env.AMQP_EXCHANGE_NAME,
  process.env.AMQP_EXPORT_QUEUE_NAME
);
