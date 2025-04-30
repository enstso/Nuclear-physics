const express = require("express");
const amqp = require("amqplib");

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
  origin: "http://localhost:5173"
}));
const RABBITMQ_URL = process.env.RABBITMQ_URL;
const directExchange = "calc_direct_exchange";
const fanoutExchange = "calc_fanout_exchange";

let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();

  await channel.assertExchange(directExchange, "direct", { durable: false });
  await channel.assertExchange(fanoutExchange, "fanout", { durable: false });

  console.log("✅ Connected to RabbitMQ");
}

app.post("/calc", async (req, res) => {
  const { op, n1, n2 } = req.body;

  if (!["add", "sub", "mul", "div", "all"].includes(op)) {
    return res.status(400).json({ error: "Invalid operation" });
  }

  if (typeof n1 !== "number" || typeof n2 !== "number") {
    return res.status(400).json({ error: "n1 and n2 must be numbers" });
  }

  const msg = JSON.stringify({ n1, n2 });

  try {
    if (op === "all") {
      channel.publish(fanoutExchange, "", Buffer.from(msg));
      console.log(`📤 Envoyé (ALL via fanout):`, msg);
    } else {
      channel.publish(directExchange, op, Buffer.from(msg));
      console.log(`📤 Envoyé (${op} via direct):`, msg);
    }

    res.json({ status: "Message sent", op, n1, n2 });
  } catch (err) {
    console.error("❌ Error sending message:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

connectRabbitMQ().then(() => {
  app.listen(3000, () => {
    console.log("🚀 Server listening on port 3000");
  });
});
