import express from "express";

import { tasksController } from "@/controllers/tasks";

const router = express.Router();

router.get("/get", tasksController.getAllTasks);
router.get("/get/:id", tasksController.get);
router.get("/getOrigin/:id", tasksController.getOrigin);
router.get("/getFromBranch/:branch_id", tasksController.getFromBranch);

router.post("/create", tasksController.create);

router.patch("/update", tasksController.update);

router.delete("/delete", tasksController.delete);

export default router;
