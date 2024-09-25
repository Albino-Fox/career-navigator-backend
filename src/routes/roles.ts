import express from "express";

import { rolesController } from "@/controllers/roles";

const router = express.Router();

router.get("/get", rolesController.getAll);
router.get("/get/:id", rolesController.get);

router.post("/create", rolesController.create);

router.patch("/patch", rolesController.update);

router.delete("/delete", rolesController.delete);

export default router;
