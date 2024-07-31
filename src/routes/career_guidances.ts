import express from "express";

import careerGuidancesController from "@/controllers/career_guidances";

const router = express.Router();

router.get("/get", careerGuidancesController.getAllCareerGuidances);
router.get("/get/:id", careerGuidancesController.getCareerGuidance);

router.post("/post", careerGuidancesController.createCareerGuidance);

router.patch("/patch", careerGuidancesController.updateCareerGuidance);

router.delete("/delete", careerGuidancesController.deleteCareerGuidance);

export default router;
