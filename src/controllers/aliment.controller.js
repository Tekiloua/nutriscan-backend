import { Aliment } from "../lib/db.js";
import { Poids } from "../lib/db.js";
import { exec } from "child_process";
import { io } from "../server.js";
import { bananeNutriments } from "../foods/banane.js";
import { carotteNutriments } from "../foods/carotte.js";
import { mangueNutriments } from "../foods/mangue.js";
import { pommeDeTerreNutriments } from "../foods/pomme_de_terre.js";
import { aubergineNutriments } from "../foods/aubergine.js";
import { betteraveNutriments } from "../foods/betterave.js";
import { courgetteNutriments } from "../foods/courgette.js";
import { oignonNutriments } from "../foods/oignon.js";
import { poivronNutriments } from "../foods/poivron.js";
import { tomateNutriments } from "../foods/tomate.js";

const path_bin = "mpg123 src/song";

const category = (name) => {
  switch (name) {
    case "banane":
      return "Fruit";
    case "betterave":
      return "Légume";
    case "courgette":
      return "Légume";
    case "carotte":
      return "Légume";
    case "mangue":
      return "Fruit";
    case "oignon":
      return "Légume";
    case "pomme de terre":
      return "Légume";
    case "aubergine":
      return "Légume";
    case "poivron":
      return "Légume";
    case "tomate":
      return "Légume";
    default:
      return "Inconnu";
  }
};

const nutrimentsFunctions = (name) => {
  switch (name) {
    case "banane":
      return bananeNutriments(100);
    case "betterave":
      return betteraveNutriments(100);
    case "courgette":
      return courgetteNutriments(100);
    case "carotte":
      return carotteNutriments(100);
    case "mangue":
      return mangueNutriments(100);
    case "oignon":
      return oignonNutriments(100);
    case "pomme de terre":
      return pommeDeTerreNutriments(100);
    case "aubergine":
      return aubergineNutriments(100);
    case "poivron":
      return poivronNutriments(100);
    case "tomate":
      return tomateNutriments(100);
    default:
      console.log("nutriments undefined");
      return {};
  }
};

export const addAliment = async (req, res) => {
  if (req.body?.name === undefined) {
    res.status(400).json({ error: "mauvais corps de la requete" });
    return;
  }
  //On ajoute les nutriments
  const aliment = {
    name: req.body.name,
    category: category(req.body.name.toLowerCase()),
    ...nutrimentsFunctions(req.body.name.toLowerCase()),
  };
  await Aliment.create(aliment).then(async (aliment) => {
    if (req.body.name.toLowerCase() === "carotte")
      exec(`${path_bin}/carotte.mp3`, (error, stderr) => {
        if (error) return;
        if (stderr) return;
      });
    else if (req.body.name.toLowerCase() === "pomme de terre")
      exec(`${path_bin}/pomme_de_terre.mp3`, (error, stderr) => {
        if (error) return;
        if (stderr) return;
      });
    else if (req.body.name.toLowerCase() === "banane")
      exec(`${path_bin}/banane_ajouter.mp3`, (error, stderr) => {
        if (error) return;
        if (stderr) return;
      });
    else if (req.body.name.toLowerCase() === "aubergine")
      exec(`${path_bin}/aubergine_ajouter.mp3`, (error, stderr) => {
        if (error) return;
        if (stderr) return;
      });
    else if (req.body.name.toLowerCase() === "betterave")
      exec(`${path_bin}/betterave_ajouter.mp3`, (error, stderr) => {
        if (error) return;
        if (stderr) return;
      });
    else if (req.body.name.toLowerCase() === "courgette")
      exec(`${path_bin}/courgette_ajouter.mp3`, (error, stderr) => {
        if (error) return;
        if (stderr) return;
      });
    else if (req.body.name.toLowerCase() === "mangue")
      exec(`${path_bin}/mangue_ajouter.mp3`, (error, stderr) => {
        if (error) return;
        if (stderr) return;
      });
    else if (req.body.name.toLowerCase() === "oignon")
      exec(`${path_bin}/oignon_ajouter.mp3`, (error, stderr) => {
        if (error) return;
        if (stderr) return;
      });
    else if (req.body.name.toLowerCase() === "poivron")
      exec(`${path_bin}/poivron_ajouter.mp3`, (error, stderr) => {
        if (error) return;
        if (stderr) return;
      });
    else if (req.body.name.toLowerCase() === "tomate")
      exec(`${path_bin}/tomate_ajouter.mp3`, (error, stderr) => {
        if (error) return;
        if (stderr) return;
      });
    else console.log("son manquante");
    try {
      const alimentsData = await Aliment.findAll({
        Oreder: [["createdAt", "DESC"]],
      });
      const poidsData = await Poids.findAll({
        Oreder: [["createdAt", "DESC"]],
      });
      io.emit("poids_update", poidsData); // ⚡ Mise à jour temps réel
      io.emit("data_update", alimentsData); // <-- ici !
      res.json({ message: "création réussie", data: aliment });
    } catch (err) {
      console.error("Erreur ajout :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }

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
    Aliment.destroy({ where: { id } }).then(async () => {
      try {
        const alimentsData = await Aliment.findAll({
          Oreder: [["createdAt", "DESC"]],
        });
        const poidsData = await Poids.findAll({
          Oreder: [["createdAt", "DESC"]],
        });
        io.emit("poids_update", poidsData); // ⚡ Mise à jour temps réel
        io.emit("data_update", alimentsData); // ⚡ Mise à jour temps réel
      } catch (err) {
        console.error("Erreur suppression :", err);
        res.status(500).json({ error: "Erreur serveur" });
      }
      try {
        Poids.destroy({ where: { id } }).then(async () => {
          if (aliment.name.toLowerCase() === "carotte")
            exec(`${path_bin}/carotte_supprimer.mp3`, (error, stderr) => {
              if (error) return;
              if (stderr) return;
            });
          else if (aliment.name.toLowerCase() === "pomme de terre")
            exec(
              `${path_bin}/pomme_de_terre_supprimer.mp3`,
              (error, stderr) => {
                if (error) return;
                if (stderr) return;
              }
            );
          else if (aliment.name.toLowerCase() === "banane")
            exec(`${path_bin}/banane_supprimer.mp3`, (error, stderr) => {
              if (error) return;
              if (stderr) return;
            });
          else if (aliment.name.toLowerCase() === "aubergine")
            exec(`${path_bin}/aubergine_supprimer.mp3`, (error, stderr) => {
              if (error) return;
              if (stderr) return;
            });
          else if (aliment.name.toLowerCase() === "betterave")
            exec(`${path_bin}/betterave_supprimer.mp3`, (error, stderr) => {
              if (error) return;
              if (stderr) return;
            });
          else if (aliment.name.toLowerCase() === "courgette")
            exec(`${path_bin}/courgette_supprimer.mp3`, (error, stderr) => {
              if (error) return;
              if (stderr) return;
            });
          else if (aliment.name.toLowerCase() === "mangue")
            exec(`${path_bin}/mangue_supprimer.mp3`, (error, stderr) => {
              if (error) return;
              if (stderr) return;
            });
          else if (aliment.name.toLowerCase() === "oignon")
            exec(`${path_bin}/oignon_supprimer.mp3`, (error, stderr) => {
              if (error) return;
              if (stderr) return;
            });
          else if (aliment.name.toLowerCase() === "poivron")
            exec(`${path_bin}/poivron_supprimer.mp3`, (error, stderr) => {
              if (error) return;
              if (stderr) return;
            });
          else if (aliment.name.toLowerCase() === "tomate")
            exec(`${path_bin}/tomate_supprimer.mp3`, (error, stderr) => {
              if (error) return;
              if (stderr) return;
            });
          else console.log("propriéré name manquante");
          // res.json({ message: "suppression poids réussie" });
        });
      } catch (err) {
        console.error("Erreur suppression du poids : ", err);
      }
      res.json({ message: "suppression reussie" });
    });
  } catch (err) {
    console.error("Erreur suppression :", err);
    res.status(500).json({ message: "suppression echoué" });
  }
};

export const deleteAllAliments = async (req, res) => {
  try {
    Aliment.destroy({ where: {} }).then(() => {
      Poids.destroy({ where: {} }).then(() => {
        exec(`${path_bin}/tous_supprimer.mp3`, (error, stderr) => {
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
  try {
    const alimentsData = await Aliment.findAll();
    const poidsData = await Poids.findAll({
      Oreder: [["createdAt", "DESC"]],
    });
    io.emit("poids_update", poidsData); // ⚡ Mise à jour temps réel
    io.emit("data_update", alimentsData); // ⚡ Mise à jour temps réel
    console.log("tous les aliments supprimés");
    res.json({ message: "tous les aliments supprimés" });
  } catch (err) {
    console.error("Erreur suppression de tout les aliments:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const unknownAliment = async (req, res) => {
  //son "aliment non reconnu"
  res.json({ message: "Aliment non reconnu" });
  exec(`${path_bin}/pas_aliment.mp3`, (error, stderr) => {
    if (error) return;
    if (stderr) return;
  });
};
