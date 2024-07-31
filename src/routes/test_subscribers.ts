import express from "express";

import { testSubscribersController } from "@/controllers/test_subscribers";

const router = express.Router();

router.get("/get", testSubscribersController.getAllTestSubscribers);
router.get("/get/:id", testSubscribersController.getTestSubscriber);

router.post("/post", testSubscribersController.createTestSubscriber);

router.patch("/patch", testSubscribersController.updateTestSubscriber);

router.delete("/delete", testSubscribersController.deleteTestSubscriber);

export default router;
