import express from "express";

import { examsController } from "@/controllers/exams";

const router = express.Router();

router.get("/get", examsController.getAllExams);
router.get("/get/:id", examsController.getExam);

router.post("/post", examsController.createExam);

router.patch("/patch", examsController.updateExam);

router.delete("/delete", examsController.deleteExam);

export default router;
