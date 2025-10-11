import express from "express";
import { initDb } from "./lib/db.js";
import alimentRouter from "./routes/aliment.route.js";
import { Poids } from "./lib/db.js";

import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // ton app React
    methods: ["GET", "POST"],
  },
});

// ✅ Quand un client se connecte
io.on("connection", (socket) => {
  console.log("Client connecté :", socket.id);

  // Envoyer les données initiales
  sendData(socket);

  socket.on("disconnect", () => {
    console.log("Client déconnecté :", socket.id);
  });
});

async function sendData(socket) {
  const poidsData = await Poids.findAll();
  socket.emit("data_update", poidsData);
}

// 🚀 Exemple route pour ajouter un produit
app.post("/add", async (req, res) => {
  try {
    await Poids.create(req.body);
    const poidsData = await Poids.findAll();
    io.emit("data_update", poidsData); // <-- ici !
    res.json({ message: "Produit ajouté avec succès" });
  } catch (err) {
    console.error("Erreur ajout :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Poids.destroy({ where: { id } });
    const poidsData = await Poids.findAll();
    io.emit("data_update", poidsData); // ⚡ Mise à jour temps réel
    res.json({ message: "Produit supprimé avec succès" });
  } catch (err) {
    console.error("Erreur suppression :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


app.use("/api/poids", alimentRouter);

server.listen(8080, () => {
  //   initDb();
});
