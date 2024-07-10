const express = require('express');
import {Request, Response} from "express";

const bodyParser = require('body-parser');
const bodyParserErrorHandler = require('express-body-parser-error-handler');

const Database = require('@/database.ts')
const config = require('@/config.ts');


function stringifyJSON(json) {
  try {
    const jsonStr = JSON.stringify(json);
    return jsonStr;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}

async function main() {
  let app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParserErrorHandler({
    onError: (err, req : Request, res : Response) => {
      console.log(`Body parsing failed on ${req.method} ${req.url}: ${err}`); // useless info, isn't it?
    }
  }));

  app.listen(config.port, config.host, () => {
    console.log(`Running on ${config.host} with port ${config.port}`);
  })

  const db = new Database();
  await db.sequelize.sync();

  //C
  app.post("/api/v1/create/test_subscribers", async (req : Request, res : Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
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
        console.error(err.original?.sqlMessage || err);
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
        console.error(err.original?.sqlMessage);
      });
  });
  
  //U
  app.patch("/api/v1/update/test_subscribers", async (req : Request, res : Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);

    await db.testSubscribers.update(
      {[req.body.key]: req.body.value},
      {
        where: {id: req.body.id},
      }
  )
    .then(result => {
      if (result[0] === 1) { // one by one
        res.send(`${req.body.key} of ${req.body.id} has been changed to ${req.body.value}`);
      } else {
        res.send(`${req.body.key} of ${req.body.id} was not updated...`);
      }
    })
    .catch(err => {
      res.send(`Something went wrong...`);
      console.error(err.original?.sqlMessage || err);
    });
});

  //D
  app.delete("/api/v1/delete/test_subscribers", async (req : Request, res : Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
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
        console.error(err.original?.sqlMessage || err);
      });
    });
};

main();