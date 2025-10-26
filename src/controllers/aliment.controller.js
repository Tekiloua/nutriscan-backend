import { Aliment } from "../lib/db.js";
import { Poids } from "../lib/db.js";
import { exec } from "child_process";

export const addAliment = async (req, res) => {
  if (req.body?.name === undefined) {
    res.status(400).json({ error: "mauvais corps de la requete" });
    return;
  }
  Aliment.create(req.body).then((aliment) => {
    if (req.body.name.toLowerCase() === "carotte")
      exec("mpg123 src/song/carotte.mp3", (error, stderr) => {
        if (error) return;
        if (stderr) return;
      });
    else if (req.body.name.toLowerCase() === "pomme de terre")
      exec("mpg123 src/song/pomme_de_terre.mp3", (error, stderr) => {
        if (error) return;
        if (stderr) return;
      });
    else console.log("propriéré name manquante");

    res.json({ message: "création réussie", data: aliment });

    // Ici on allume la lampe torche du téléphone via une requête système
  });
};

export const getAllAliments = async (req, res) => {
  Aliment.findAll().then((aliments) => {
    res.json({ message: "récupération réussie", data: aliments });
  });
};

export const deleteAliment = async (req, res) => {
  const { id } = req.params;
  // si l'id n'est pas un nombre
  if (isNaN(Number(id))) {
    res.status(400).json({ error: "L'id n'est pas un nombre" });
    return;
  }
  // vérifier si l'aliment existe
  const aliment = await Aliment.findOne({ where: { id } });
  if (!aliment) {
    res.status(404).json({ error: "Aliment non trouvé" });
    return;
  }

  try {
    Aliment.destroy({ where: { id } }).then(() => {
      try {
        Poids.destroy({ where: { id } }).then(() => {
          if (aliment.name.toLowerCase() === "carotte")
            exec("mpg123 src/song/carotte_supprimer.mp3", (error, stderr) => {
              if (error) return;
              if (stderr) return;
            });
          else if (aliment.name.toLowerCase() === "pomme de terre")
            exec(
              "mpg123 src/song/pomme_de_terre_supprimer.mp3",
              (error, stderr) => {
                if (error) return;
                if (stderr) return;
              }
            );
          else console.log("propriéré name manquante");
          res.json({ message: "suppression poids réussie" });
        });
      } catch (err) {
        console.error("Erreur suppression du poids : ", err);
      }
    });
  } catch (err) {
    console.error("Erreur suppression :", err);
  }
};

export const deleteAllAliments = async (req, res) => {
  try {
    Aliment.destroy({ where: {} }).then(() => {
      Poids.destroy({ where: {} }).then(() => {
        res.json({
          message: "Tous les aliments et poids ont été supprimés avec succès.",
        });
        exec("mpg123 src/song/tous_supprimer.mp3", (error, stderr) => {
          if (error) return;
          if (stderr) return;
        });
      });
    });
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de tous les aliments et poids :",
      error
    );
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de la suppression." });
  }
};

export const unknownAliment = async (req, res) => {
  //son "aliment non reconnu"
  res.json({ message: "Aliment non reconnu" });
  exec("mpg123 src/song/pas_aliment.mp3", (error, stderr) => {
    if (error) return;
    if (stderr) return;
  });
};
