import express from "express";

import { careerGuidanceBranchesController } from "@/controllers/career_guidance_branches";

const router = express.Router();

router.get("/get", careerGuidanceBranchesController.getAll);
router.get("/get/:id", careerGuidanceBranchesController.get);
router.get("/getFrom/:user_id", careerGuidanceBranchesController.getFrom);
router.post(
  "/getTasksOfCareerGuidance/:career_guidance_id",
  careerGuidanceBranchesController.getTasksOfCareerGuidance,
);
router.post(
  "/getTasksOfCareerGuidanceAll",
  careerGuidanceBranchesController.getTasksOfCareerGuidanceAll,
);

router.post("/create", careerGuidanceBranchesController.create);

router.patch("/update", careerGuidanceBranchesController.update);

router.delete("/delete", careerGuidanceBranchesController.delete);

export default router;
