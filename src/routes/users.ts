import express from "express";

import { usersController } from "@/controllers/users";

const router = express.Router();

router.get("/get", usersController.getAllUsers);
router.get("/get/:id", usersController.getUser);

router.post("/post", usersController.createUser);

router.patch("/patch", usersController.updateUser);

router.delete("/delete", usersController.deleteUser);

export default router;
