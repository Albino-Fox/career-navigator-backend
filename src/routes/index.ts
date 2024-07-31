import express from "express";

import testSubscribersRouter from "../routes/test_subscribers.ts";
import usersRouter from "../routes/users.ts";
import careerGuidanceQuestionsRouter from "../routes/career_guidance_questions.ts";
import rolesRouter from "../routes/roles.ts";
import careerGuidanceRouter from "../routes/career_guidance.ts";
import competencyStatusesRouter from "../routes/competency_statuses.ts";
import competenciesRouter from "../routes/competencies.ts";
import vacanciesRouter from "../routes/vacancies.ts";
import universitiesRouter from "../routes/universities.ts";
import examStatusesRouter from "../routes/exam_statuses.ts";
import examsRouter from "../routes/exams.ts";
import examTasksRouter from "../routes/exam_tasks.ts";

const router = express.Router();

router.use("/test_subscribers", testSubscribersRouter);
router.use("/users", usersRouter);
router.use("/career_guidance_questions", careerGuidanceQuestionsRouter);
router.use("/roles", rolesRouter);
router.use("/career_guidance", careerGuidanceRouter);
router.use("/competency_statuses", competencyStatusesRouter);
router.use("/competencies", competenciesRouter);
router.use("/vacancies", vacanciesRouter);
router.use("/universities", universitiesRouter);
router.use("/exam_statuses", examStatusesRouter);
router.use("/exams", examsRouter);
router.use("/exam_tasks", examTasksRouter);

export default router;
