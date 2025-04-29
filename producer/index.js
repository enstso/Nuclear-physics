const amqp = require("amqplib");

async function produce() {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    const directExchange = "calc_direct_exchange";
    const fanoutExchange = "calc_fanout_exchange";

    await channel.assertExchange(directExchange, "direct", { durable: false });
    await channel.assertExchange(fanoutExchange, "fanout", { durable: false });

    const operations = ["add", "sub", "mul", "div", "all"];

    setInterval(() => {
      const n1 = Math.floor(Math.random() * 100);
      const n2 = Math.floor(Math.random() * 100);
      const op = operations[Math.floor(Math.random() * operations.length)];

      const msg = JSON.stringify({ n1, n2 });

      if (op === "all") {
        channel.publish(fanoutExchange, "", Buffer.from(msg));
        console.log(`📤 Envoyé (ALL via fanout):`, msg);
      } else {
        channel.publish(directExchange, op, Buffer.from(msg));
        console.log(`📤 Envoyé (${op} via direct):`, msg);
      }
    }, 5000);
  } catch (err) {
    console.error("❌ Erreur de connexion à RabbitMQ:", err);
    process.exit(1);
  }
}

produce();
