import { Router } from "express";
import { createAboutUs, getAboutUs,updateAboutUs,deleteAboutUs } from "../controllers/aboutus.controller.js";

const router = Router();

router.get("/", getAboutUs);
router.post("/", createAboutUs);
router.put("/:id", updateAboutUs);
router.delete("/", deleteAboutUs);

export default router;
