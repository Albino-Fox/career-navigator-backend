import express from "express";

import { careerGuidanceQuestionsController } from "@/controllers/career_guidance_questions";

const router = express.Router();

router.get("/get", careerGuidanceQuestionsController.getAllCareerGuidanceQuestions);
router.get("/get/:id", careerGuidanceQuestionsController.getCareerGuidanceQuestion);

router.post("/post", careerGuidanceQuestionsController.createCareerGuidanceQuestion);

router.patch("/patch", careerGuidanceQuestionsController.updateCareerGuidanceQuestion);

router.delete("/delete", careerGuidanceQuestionsController.deleteCareerGuidanceQuestion);

export default router;
