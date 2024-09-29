import express from "express";

import { applicationsController } from "@/controllers/applications";

const router = express.Router();

router.get("/get", applicationsController.getAll);

router.post("/checkApplication", applicationsController.checkApplication);
router.post("/create", applicationsController.create);

router.patch("/update", applicationsController.update);

router.delete("/delete", applicationsController.delete);

export default router;
