import { Poids } from "../lib/db.js";

export const addPoids = async (req, res) => {
  Poids.create(req.body).then((poids) => {
    res.json({ message: "création réussie", data: poids });
  });
};

export const getAllPoids = async (req, res) => {
  Poids.findAll().then((poids) => {
    res.json({ message: "récupération réussie", data: poids });
  });
};
