const express = require('express');
import {Request, Response} from "express"; // bruh

const Database = require('@/database.ts')
const config = require('@/config.ts');

async function main() {
  let app = express();
  app.listen(config.port, config.host, () => {
    console.log(`Running on ${config.host} with port ${config.port}`);
  })

  const db = new Database();
  await db.sequelize.sync();
  let records = await db.testSubscribers.findAll();
  db.testSubscribers.create({
    username: `testo${records.length}`,
    subscription_date: new Date(Date.now()).toString(),
  }).then((result) => console.log(`User ${result.username} created`))
    .catch(err => console.error(err));
  
  app.get("/now", (req : Request, res : Response) => {
    res.send(new Date(Date.now()).toString());
  });
  
};

main();