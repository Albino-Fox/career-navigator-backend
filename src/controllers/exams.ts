import { Request, Response } from "express";
import db from "@/database.ts";
import { stringifyJSON } from "@/utils/index.ts";

class ExamsController {
  getAllExams = async (req: Request, res: Response) => {
    await db.exams
      .findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };

  getExam = async (req: Request, res: Response) => {
    await db.exams
      .findByPk(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };

  createExam = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    await db.exams
      .create({
        // TODO: Add proper fields
        // username: req.body.username,
        // subscription_date: new Date(Date.now()).toString(),
      })
      .then((record) => {
        res.send(`${record.id} was created`);
        console.log(`Exam ${record.id} created`);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage || err);
      });
  };

  updateExam = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    await db.exams
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
  };

  deleteExam = async (req: Request, res: Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
    await db.exams
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
  };
}

export const examsController = new ExamsController();
