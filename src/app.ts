import express from "express";
import { Request, Response } from "express";

import bodyParser from "body-parser";
import bodyParserErrorHandler from "express-body-parser-error-handler";

import db from "@/database.ts";
import config from "@/config/config.ts";
import routes from "@/routes/index.ts";

async function main() {
  let app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    bodyParserErrorHandler({
      onError: (err: Error, req: Request, res: Response) => {
        console.log(`Body parsing failed on ${req.method} ${req.url}: ${err}`);
      },
    }),
  );

  // WARNING: Further logic must be provided in the API
  app.use("/api", routes);

  app.listen(config.port, config.host, () => {
    console.log(`Running on ${config.host} with port ${config.port}`);
  });

  await db.sequelize!.sync();
}

main();
