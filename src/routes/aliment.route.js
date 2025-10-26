import express from "express";
import {
  addAliment,
  getAllAliments,
  deleteAliment,
  deleteAllAliments,
  unknownAliment
} from "../controllers/aliment.controller.js";

const router = express.Router();

router.post("/add", addAliment);
router.get("/", getAllAliments);
router.delete("/delete/:id", deleteAliment);
router.delete("/delete/", deleteAllAliments);
// route pour un aliment non reconnu
router.get("/unknown",unknownAliment)

export default router;
