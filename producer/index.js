const amqp = require("amqplib");

async function produce() {
  try {
    // Connect to RabbitMQ
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    const queue = "test_queue";

    const message = "Hello, RabbitMQ!";

    await channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(message), {
      persistent: true,
    });

    console.log("Message sent: %s", message);

    setTimeout(() => {
      channel.close();
      connection.close();
      console.log("Connection closed");
    }, 500); // Wait for the message to be sent before closing the connection
  } catch (err) {
    console.error("Error connecting to RabbitMQ:", err);
    process.exit(1);
  }
}

produce();