import express from "express";

import { careerGuidanceBranchesController } from "@/controllers/career_guidance_branches";

const router = express.Router();

router.get("/get", careerGuidanceBranchesController.getAll);
router.get("/get/:id", careerGuidanceBranchesController.get);

router.post("/create", careerGuidanceBranchesController.create);

router.patch("/patch", careerGuidanceBranchesController.update);

router.delete("/delete", careerGuidanceBranchesController.delete);

export default router;
