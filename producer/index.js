const amqp = require("amqplib");

async function produce() {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    const queue = "calc_request";
    channel.assertQueue(queue, {
      durable: false,
    });

    setInterval(() => {
      const n1 = Math.floor(Math.random() * 100);
      const n2 = Math.floor(Math.random() * 100);
      const msg = JSON.stringify({ n1, n2 });
      ch.sendToQueue(queue, Buffer.from(msg));
      console.log("📤 Sent:", msg);
    }, 5000);
  } catch (err) {
    console.error("Error connecting to RabbitMQ:", err);
    process.exit(1);
  }
}

produce();
