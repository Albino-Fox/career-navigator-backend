import express from "express";
import { Request, Response } from "express";
import db from "../database.ts";
import { stringifyJSON } from "../utils.ts";

const router = express.Router();

router.get("/get", async (req: Request, res: Response) => {
  await db.competencies
    .findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(`Something went wrong...`);
      console.error(err.original?.sqlMessage);
    });
});

router.get("/get/:id", async (req: Request, res: Response) => {
  await db.competencies
    .findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(`Something went wrong...`);
      console.error(err.original?.sqlMessage);
    });
});

router.post("/post", async (req: Request, res: Response) => {
  console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
  await db.competencies
    .create({
      // TODO: Add proper fields
      // username: req.body.username,
      // subscription_date: new Date(Date.now()).toString(),
    })
    .then((record) => {
      res.send(`${record.id} was created`);
      console.log(`User ${record.id} created`);
    })
    .catch((err) => {
      res.send(`Something went wrong...`);
      console.error(err.original?.sqlMessage || err);
    });
});

router.patch("/patch", async (req: Request, res: Response) => {
  console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
  await db.competencies
    .update(
      { [req.body.key]: req.body.value },
      {
        where: { id: req.body.id },
      },
    )
    .then((result) => {
      if (result[0] === 1) {
        // one by one
        res.send(
          `${req.body.key} of ${req.body.id} has been changed to ${req.body.value}`,
        );
      } else {
        res.send(`${req.body.key} of ${req.body.id} was not updated...`);
      }
    })
    .catch((err) => {
      res.send(`Something went wrong...`);
      console.error(err.original?.sqlMessage || err);
    });
});

router.delete("/delete", async (req: Request, res: Response) => {
  console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
  await db.competencies
    .destroy({
      where: {
        id: req.body.id,
      },
    })
    .then((result) => {
      if (result === 1) {
        res.send(`${req.body.id} has been deleted.`);
      } else {
        res.send(`${req.body.id} is not found`);
      }
    })
    .catch((err) => {
      res.send(`Something went wrong...`);
      console.error(err.original?.sqlMessage || err);
    });
});

export default router;
