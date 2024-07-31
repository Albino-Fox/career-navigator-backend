import express from "express";

import { universitiesController } from "@/controllers/universities";

const router = express.Router();

router.get("/get", universitiesController.getAllUniversities);
router.get("/get/:id", universitiesController.getUniversity);

router.post("/post", universitiesController.createUniversity);

router.patch("/patch", universitiesController.updateUniversity);

router.delete("/delete", universitiesController.deleteUniversity);

export default router;
