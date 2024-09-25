import express from "express";

import { careerGuidanceBranchesController } from "@/controllers/career_guidance_branches";

const router = express.Router();

router.get("/get", careerGuidanceBranchesController.getAll);
router.get("/get/:id", careerGuidanceBranchesController.get);
router.get("/getFrom/:user_id", careerGuidanceBranchesController.getFromUser);

router.post("/create", careerGuidanceBranchesController.create);

router.patch("/update", careerGuidanceBranchesController.update);

router.delete("/delete", careerGuidanceBranchesController.delete);

export default router;
