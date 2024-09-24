import express from "express";

import { usersController } from "@/controllers/users";

const router = express.Router();

router.get("/get", usersController.getAll);
router.get("/get/:id", usersController.get);

router.post("/post", usersController.create);

router.patch("/patch", usersController.update);

router.delete("/delete", usersController.delete);

export default router;
