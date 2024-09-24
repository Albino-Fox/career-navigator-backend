import express from "express";

import { applicationsController } from "@/controllers/applications";

const router = express.Router();

router.get("/get", applicationsController.getAll);
router.get("/get/:id", applicationsController.get);

router.post("/post", applicationsController.create);

router.patch("/patch", applicationsController.update);

router.delete("/delete", applicationsController.delete);

export default router;
