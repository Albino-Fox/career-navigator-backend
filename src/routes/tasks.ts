import express from "express";

import { tasksController } from "@/controllers/tasks";

const router = express.Router();

router.get("/get", tasksController.getAllCompetencies);
router.get("/get/:id", tasksController.get);

router.post("/create", tasksController.create);

router.patch("/patch", tasksController.update);

router.delete("/delete", tasksController.delete);

export default router;
