import express from "express";

import { examTasksController } from "@/controllers/exam_tasks";

const router = express.Router();

router.get("/get", examTasksController.getAllExamTasks);
router.get("/get/:id", examTasksController.getExamTask);

router.post("/post", examTasksController.createExamTask);

router.patch("/patch", examTasksController.updateExamTask);

router.delete("/delete", examTasksController.deleteExamTask);

export default router;
