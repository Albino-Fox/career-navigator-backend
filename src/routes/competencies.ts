import express from "express";

import { competenciesController } from "@/controllers/competencies";

const router = express.Router();

router.get("/get", competenciesController.getAllCompetencies);
router.get("/get/:id", competenciesController.getCompetency);

router.post("/post", competenciesController.createCompetency);

router.patch("/patch", competenciesController.updateCompetency);

router.delete("/delete", competenciesController.deleteCompetency);

export default router;
