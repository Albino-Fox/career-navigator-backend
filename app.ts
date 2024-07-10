const express = require('express');
import {Request, Response} from "express";

const { Op } = require ('sequelize');

const bodyParser = require('body-parser');
const Database = require('@/database.ts')
const config = require('@/config.ts');

async function main() {
  let app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.listen(config.port, config.host, () => {
    console.log(`Running on ${config.host} with port ${config.port}`);
  })

  const db = new Database();
  await db.sequelize.sync();

  //C
  app.post("/api/v1/create/test_subscribers", async (req : Request, res : Response) => {
    console.log(`Recieved CREATE request: ${JSON.stringify(req.body)}`);
    await db.testSubscribers.create({
      username: req.body.username,
      subscription_date: new Date(Date.now()).toString(),
    })
      .then((record) => {
        res.send(`${record.username} was created`);
        console.log(`User ${record.username} created`);
      })
      .catch(err => {
        res.send(`Something went wrong...`);
        console.error(err.original.sqlMessage);
      });
  });
  
  //R
  app.get("/api/v1/get/test_subscribers", async (req : Request, res : Response) => {
    await db.testSubscribers.findAll()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(`Something went wrong...`);
        console.error(err.original.sqlMessage);
      });
  });
  
  //U


  //D
  app.delete("/api/v1/delete/test_subscribers", async (req : Request, res : Response) => {
    console.log(`Recieved DELETE request: ${JSON.stringify(req.body)}`);
    await db.testSubscribers.destroy({
      where: {
        id: req.body.id,
      },
    })
      .then(result => {
        if (result === 1) {
          res.send(`${req.body.id} has been deleted.`);
        } else {
          res.send(`${req.body.id} is not found`);
        }
      })
      .catch(err => {
        res.send(`Something went wrong...`);
        console.error(err);
      });
    });
};

main();