import express from "express";

import { competencyStatusesController } from "@/controllers/competency_statuses";

const router = express.Router();

router.get("/get", competencyStatusesController.getAllCompetencyStatuses);
router.get("/get/:id", competencyStatusesController.getCompetencyStatus);

router.post("/post", competencyStatusesController.createCompetencyStatus);

router.patch("/patch", competencyStatusesController.updateCompetencyStatus);

router.delete("/delete", competencyStatusesController.deleteCompetencyStatus);

export default router;
