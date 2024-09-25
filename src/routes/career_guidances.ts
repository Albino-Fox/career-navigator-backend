import express from "express";

import { careerGuidancesController } from "@/controllers/career_guidances";

const router = express.Router();

router.get("/get", careerGuidancesController.getAll);
router.get("/get/:id", careerGuidancesController.get);

router.post("/create", careerGuidancesController.create);

router.patch("/update", careerGuidancesController.update);

router.delete("/delete", careerGuidancesController.delete);

export default router;
