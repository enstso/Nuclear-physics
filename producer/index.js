const amqp = require("amqplib");

async function produce() {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    const exchange = "calc_direct_exchange";
    await channel.assertExchange(exchange, "direct", { durable: false });

    const operations = ["add", "sub", "mul", "div"];

    setInterval(() => {
      const n1 = Math.floor(Math.random() * 100);
      const n2 = Math.floor(Math.random() * 100);
      const op = operations[Math.floor(Math.random() * operations.length)];

      const msg = JSON.stringify({ n1, n2 });
      channel.publish(exchange, op, Buffer.from(msg)); // op = routingKey
      console.log(`📤 Envoyé (${op}):`, msg);
    }, 5000);
  } catch (err) {
    console.error("❌ Erreur de connexion à RabbitMQ:", err);
    process.exit(1);
  }
}

produce();
