import express from "express";

import { vacanciesController } from "@/controllers/vacancies";

const router = express.Router();

router.get("/get", vacanciesController.getAll);
router.get("/get/:id", vacanciesController.get);
router.get("/getFrom/:user_id", vacanciesController.getFromUser);

router.post("/create", vacanciesController.create);

router.patch("/update/:id", vacanciesController.update);

router.delete("/delete", vacanciesController.delete);

export default router;
