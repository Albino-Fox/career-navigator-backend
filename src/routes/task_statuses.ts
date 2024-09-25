import express from "express";

import { taskStatusesController } from "@/controllers/task_statuses";

const router = express.Router();

router.get("/get", taskStatusesController.getAll);
router.get("/get/:id", taskStatusesController.get);

router.post("/create", taskStatusesController.create);

router.patch("/update", taskStatusesController.update);

router.delete("/delete", taskStatusesController.delete);

export default router;
