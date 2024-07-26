import express from "express";
import { Request, Response } from "express";

import bodyParser from "body-parser";
import bodyParserErrorHandler from "express-body-parser-error-handler";

import db from "./src/database.ts";
import config from "./src/config.ts";

import testSubscribersRouter from "./src/routes/test_subscribers.ts";

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
}

main();
