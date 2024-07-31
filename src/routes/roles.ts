import express from "express";

import { rolesController } from "@/controllers/roles";

const router = express.Router();

router.get("/get", rolesController.getAllRoles);
router.get("/get/:id", rolesController.getRole);

router.post("/post", rolesController.createRole);

router.patch("/patch", rolesController.updateRole);

router.delete("/delete", rolesController.deleteRole);

export default router;
