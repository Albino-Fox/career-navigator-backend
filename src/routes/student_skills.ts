import express from "express";

import { studentSkillsController } from "@/controllers/student_skills";

const router = express.Router();

router.get("/get", studentSkillsController.getAll);
router.get("/get/:id", studentSkillsController.get);
router.get("/getMax/:id", studentSkillsController.getMax);

router.post("/create", studentSkillsController.create);

router.patch("/update", studentSkillsController.update);

router.delete("/delete", studentSkillsController.delete);

export default router;
