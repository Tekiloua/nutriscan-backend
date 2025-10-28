import { Poids, Aliment } from "../lib/db.js";
import { io } from "../server.js";

export const addPoids = async (req, res) => {
  Poids.create(req.body).then(async (poids) => {
    const poidsData = await Poids.findAll({
      Oreder: [["createdAt", "DESC"]],
    });
        const alimentsData = await Aliment.findAll();
    io.emit("data_update", alimentsData); // ⚡ Mise à jour temps réel
    
    io.emit("poids_update", poidsData); // ⚡ Mise à jour temps réel
    res.json({ message: "création réussie", data: poids });
  });
};

export const getAllPoids = async (req, res) => {
  Poids.findAll().then((poids) => {
    res.json({ message: "récupération réussie", data: poids });
  });
};
