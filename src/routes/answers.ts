import express from "express";

import { answersController } from "@/controllers/answers";

const router = express.Router();

router.get("/get", answersController.getAll);
router.get("/get/:id", answersController.get);

router.post("/post", answersController.create);

router.patch("/patch", answersController.update);

router.delete("/delete", answersController.delete);

export default router;
