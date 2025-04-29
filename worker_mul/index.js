const amqp = require("amqplib");

async function worker() {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;
    const operation = process.argv[2]; // e.g., "mul"

    if (!operation) {
      console.error("Please provide an operation (e.g., mul) as a command line argument.");
      process.exit(1);
    }

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    const exchange = "calc_direct_exchange";
    const resultQueue = "calc_results";
    const queue = "mul_queue";

    await channel.assertExchange(exchange, "direct", { durable: false });
    await channel.assertQueue(resultQueue, { durable: false });

    // Create a temporary exclusive queue for this worker
    await channel.assertQueue(queue, { durable: false });

    // Bind the queue to the exchange using the operation as routing key
    await channel.bindQueue(queue, exchange, operation);

    console.log(`🔧 Waiting for "${operation}" messages...`);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const { n1, n2 } = JSON.parse(msg.content.toString());
        console.log("📥 Received:", n1, n2);

        const delay = Math.floor(Math.random() * 10000) + 5000;
        await new Promise((res) => setTimeout(res, delay));

        const result = {
          n1,
          n2,
          op: operation,
          result: n1 * n2,
        };

        channel.sendToQueue(resultQueue, Buffer.from(JSON.stringify(result)));
        console.log("✅ Processed and sent:", result);

        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

worker();
