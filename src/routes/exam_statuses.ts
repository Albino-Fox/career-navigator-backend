import express from "express";

import { examStatusesController } from "@/controllers/exam_statuses";

const router = express.Router();

router.get("/get", examStatusesController.getAllExamStatuses);
router.get("/get/:id", examStatusesController.getExamStatus);

router.post("/post", examStatusesController.createExamStatus);

router.patch("/patch", examStatusesController.updateExamStatus);

router.delete("/delete", examStatusesController.deleteExamStatus);

export default router;
