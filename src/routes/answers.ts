import express from "express";

import { answersController } from "@/controllers/answers";

const router = express.Router();

router.get("/get", answersController.getAll);
router.get("/get/:id", answersController.get);

router.post("/create", answersController.create);

router.patch("/update", answersController.update);

router.delete("/delete", answersController.delete);

export default router;
