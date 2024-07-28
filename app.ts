import express from "express";
import { Request, Response } from "express";

import bodyParser from "body-parser";
import bodyParserErrorHandler from "express-body-parser-error-handler";

import db from "./src/database.ts";
import config from "./src/config.ts";

import testSubscribersRouter from "./src/routes/test_subscribers.ts";
import usersRouter from "./src/routes/users.ts";
import careerGuidanceQuestionsRouter from "./src/routes/career_guidance_questions.ts";
import rolesRouter from "./src/routes/roles.ts";
import careerGuidanceRouter from "./src/routes/career_guidance.ts";
import competencyStatusesRouter from "./src/routes/competency_statuses.ts";
import competenciesRouter from "./src/routes/competencies.ts";
import vacanciesRouter from "./src/routes/vacancies.ts";
import universitiesRouter from "./src/routes/universities.ts";
import examStatusesRouter from "./src/routes/exam_statuses.ts";
import examsRouter from "./src/routes/exams.ts";
import examTasksRouter from "./src/routes/exam_tasks.ts";

async function main() {
  let app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    bodyParserErrorHandler({
      onError: (err, req: Request, res: Response) => {
        console.log(`Body parsing failed on ${req.method} ${req.url}: ${err}`); // useless info, isn't it?
      },
    }),
  );

  app.listen(config.port, config.host, () => {
    console.log(`Running on ${config.host} with port ${config.port}`);
  });

  await db.sequelize!.sync();

  app.use("/api/test_subscribers", testSubscribersRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/career_guidance_questions", careerGuidanceQuestionsRouter);
  app.use("/api/roles", rolesRouter);
  app.use("/api/career_guidance", careerGuidanceRouter);
  app.use("/api/competency_statuses", competencyStatusesRouter);
  app.use("/api/competencies", competenciesRouter);
  app.use("/api/vacancies", vacanciesRouter);
  app.use("/api/universities", universitiesRouter);
  app.use("/api/exam_statuses", examStatusesRouter);
  app.use("/api/exams", examsRouter);
  app.use("/api/exam_tasks", examTasksRouter);
}

main();
