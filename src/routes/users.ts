import express from "express";

import { usersController } from "@/controllers/users";

const router = express.Router();

router.get("/get", usersController.getAll);
router.get("/get/:id", usersController.get);
router.get("/getUniversities", usersController.getUniversities);
router.get("/getUniversity/:id", usersController.getUniversity);

router.post("/create", usersController.create);

router.patch("/:id/updateProfile", usersController.updateProfile);
router.patch(
  "/:id/updateProfileUniversity",
  usersController.updateProfileUniversity,
);
router.patch("/setFocus/", usersController.setFocus);

router.delete("/delete", usersController.delete);

export default router;
