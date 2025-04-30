const express = require("express");
const amqp = require("amqplib");

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
  origin: "http://localhost:5173"

}));

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const RESULT_QUEUE = "calc_results";

let channel;
const results = []; // mémoire temporaire (FIFO)

// ➕ Consommation des résultats
async function connectAndConsumeResults() {
  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(RESULT_QUEUE, { durable: true });

  channel.consume(RESULT_QUEUE, (msg) => {
    if (msg !== null) {
      const res = JSON.parse(msg.content.toString());
      console.log("📥 Result received:", res);
      results.push(res);

      // Garde seulement les 100 derniers résultats
      if (results.length > 100) results.shift();

      channel.ack(msg);
    }
  });

  console.log("📡 Listening for results on:", RESULT_QUEUE);
}

// 🚀 Endpoint pour récupérer les résultats
app.get("/results", (req, res) => {
  res.json(results);
});

// 🗑️ Endpoint pour supprimer tous les résultats
app.delete("/results", (req, res) => {
  results.length = 0; // vide le tableau sans changer sa référence
  console.log("🧹 Tous les résultats ont été supprimés.");
  res.status(200).json({ message: "Tous les résultats ont été supprimés." });
});

// Démarrage
connectAndConsumeResults().then(() => {
  app.listen(3000, () => {
    console.log("✅ Server listening on port 3000 (GET /results)");
  });
});
