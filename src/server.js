import express from "express";
import { initDb } from "./lib/db.js";
import poidsRouter from "./routes/poids.route.js";
import alimentRouter from "./routes/aliment.route.js";
import { Poids, Aliment } from "./lib/db.js";
import player from "play-sound";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { exec } from "child_process";

const app = express();
const play = player({ player: "mpg123" });
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

export const io = new Server(server, {
  cors: {
    origin: "*", // ton app React
    methods: ["GET", "POST", "DELETE"],
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
  const alimentsData = await Aliment.findAll();
  socket.emit("data_update", alimentsData);
}

// 🚀 Exemple route pour ajouter un produit
// app.post("/add", async (req, res) => {
//   try {
//     await Poids.create(req.body);
//     const poidsData = await Poids.findAll();
//     io.emit("data_update", poidsData); // <-- ici !
//     res.json({ message: "Produit ajouté avec succès" });
//   } catch (err) {
//     console.error("Erreur ajout :", err);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });

// app.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Poids.destroy({ where: { id } });
//     const poidsData = await Poids.findAll();
//     io.emit("data_update", poidsData); // ⚡ Mise à jour temps réel
//     res.json({ message: "Produit supprimé avec succès" });
//   } catch (err) {
//     console.error("Erreur suppression :", err);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });
// Quand un utilisateur va sur /



app.use("/api/poids", poidsRouter);
app.use("/api/aliments", alimentRouter);


app.get("/carotte", (req, res) => {
  exec("mpg123 src/song/carotte.mp3", (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur : ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`STDERR : ${stderr}`);
      return;
    }
  });

  res.send("Carotte ajouté au serveur !");
});

app.get("/pomme-de-terre", (req, res) => {
  exec("mpg123 src/song/pomme_de_terre.mp3", (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur : ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`STDERR : ${stderr}`);
      return;
    }
  });

  res.send("Pomme de terre ajouté au serveur !");
});

app.get("/pomme-de-terre-delete", (req, res) => {
  exec(
    "mpg123 src/song/pomme_de_terre_supprime.mp3",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur : ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`STDERR : ${stderr}`);
        return;
      }
    }
  );

  res.send("Pomme de terre ajouté au serveur !");
});

server.listen(8080, () => {
  // initDb();
});
