import express from "express";

import { taskStatusesController } from "@/controllers/task_statuses";

const router = express.Router();

router.get("/get", taskStatusesController.getAll);
router.get("/get/:id", taskStatusesController.get);

router.post("/post", taskStatusesController.create);

router.patch("/patch", taskStatusesController.update);

router.delete("/delete", taskStatusesController.delete);

export default router;
