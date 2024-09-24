import express from "express";

import { tasksController } from "@/controllers/tasks";

const router = express.Router();

router.get("/get", tasksController.getAllCompetencies);
router.get("/get/:id", tasksController.getCompetency);

router.post("/post", tasksController.createCompetency);

router.patch("/patch", tasksController.updateCompetency);

router.delete("/delete", tasksController.deleteCompetency);

export default router;
