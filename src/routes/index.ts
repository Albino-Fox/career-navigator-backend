import express from "express";

import testSubscribersRouter from "@/routes/test_subscribers.ts";
import usersRouter from "@/routes/users.ts";
import rolesRouter from "@/routes/roles.ts";
import careerGuidancesRouter from "./career_guidances.ts";
import careerGuidanceBranchesRouter from "./career_guidance_branches.ts";
import taskStatusesRouter from "@/routes/task_statuses.ts";
import answersRouter from "@/routes/answers.ts";
import applicationsRouter from "@/routes/applications.ts";
import tasksRouter from "@/routes/tasks.ts";
import vacanciesRouter from "@/routes/vacancies.ts";

const router = express.Router();

router.use("/test_subscribers", testSubscribersRouter);
router.use("/users", usersRouter);
router.use("/roles", rolesRouter);
router.use("/career_guidances", careerGuidancesRouter);
router.use("/career_guidance_branches", careerGuidanceBranchesRouter);
router.use("/answers", answersRouter);
router.use("/applications", applicationsRouter);
router.use("/tasks", tasksRouter);
router.use("/task_statuses", taskStatusesRouter);
router.use("/vacancies", vacanciesRouter);

export default router;
