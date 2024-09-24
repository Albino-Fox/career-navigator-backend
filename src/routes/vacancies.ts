import express from "express";

import { vacanciesController } from "@/controllers/vacancies";

const router = express.Router();

router.get("/get", vacanciesController.getAll);
router.get("/get/:id", vacanciesController.get);

router.post("/post", vacanciesController.create);

router.patch("/patch", vacanciesController.update);

router.delete("/delete", vacanciesController.delete);

export default router;
