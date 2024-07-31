import express from "express";

import { vacanciesController } from "@/controllers/vacancies";

const router = express.Router();

router.get("/get", vacanciesController.getAllVacancies);
router.get("/get/:id", vacanciesController.getVacancy);

router.post("/post", vacanciesController.createVacancy);

router.patch("/patch", vacanciesController.updateVacancy);

router.delete("/delete", vacanciesController.deleteVacancy);

export default router;
