const amqp = require("amqplib");

async function worker() {
  try {
    const rabbitmqUrl = process.env.RABBITMQ_URL;

    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    const requestQueue = "calc_requests";
    const resultQueue = "calc_results";
    
    channel.assertQueue(requestQueue, { durable: false });
    channel.assertQueue(resultQueue, { durable: false });

    channel.consume(requestQueue, async (msg) => {
      if (msg !== null) {
        const { n1, n2 } = JSON.parse(msg.content.toString());
        console.log("📥 Received:", n1, n2);

        const delay = Math.floor(Math.random() * 10000) + 5000;
        await new Promise((res) => setTimeout(res, delay));

        const result = {
          n1,
          n2,
          op: 'add',
          result: n1 + n2,
        };
        channel.sendToQueue(resultQueue, Buffer.from(JSON.stringify(result)));
        console.log("✅ Processed and sent:", result);

        channel.ack(msg); // Acknowledge the message after processing
      }
    });
  } catch (err) {
    console.error("Error connecting to RabbitMQ:", err);
    process.exit(1);
  }
}

worker();
