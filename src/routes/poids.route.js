import express from "express";
import { addPoids, getAllPoids } from "../controllers/poids.controller.js";

const router = express.Router();

router.post("/add", addPoids);
router.get("/", getAllPoids);

export default router;
