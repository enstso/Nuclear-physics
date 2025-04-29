const amqp = require("amqplib");

async function produce() {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    const requestQueue = "calc_requests";
    channel.assertQueue(requestQueue, {
      durable: false,
    });

    setInterval(() => {
      const n1 = Math.floor(Math.random() * 100);
      const n2 = Math.floor(Math.random() * 100);
      const msg = JSON.stringify({ n1, n2 });
      channel.sendToQueue(requestQueue, Buffer.from(msg));
      console.log("📤 Sent:", msg);
    }, 5000);
  } catch (err) {

    console.error("Error connecting to RabbitMQ:", err);
    process.exit(1);
  }
}

produce();
