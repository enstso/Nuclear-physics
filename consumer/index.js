const amqp = require("amqplib");

async function consume() {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    const resultQueue = "calc_results";

    await channel.assertQueue(resultQueue, { durable: false });

    channel.consume(resultQueue, (msg) => {
      if (msg !== null) {
        const res = JSON.parse(msg.content.toString());
        console.log("📥 Result received:", res);
        channel.ack(msg); // Acknowledge the message after processing
      }
    });
  } catch (err) {
    console.error("Error connecting to RabbitMQ:", err);
    process.exit(1);
  }
}

consume();
