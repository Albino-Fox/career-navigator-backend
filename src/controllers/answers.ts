import { Request, Response } from "express";
import db from "@/database.ts";
import { stringifyJSON } from "@/utils/index.ts";
import { Roles } from "@/types/user";

class AnswersController {
  getAll = async (req: Request, res: Response) => {
    await db.answers
      .findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };

  get = async (req: Request, res: Response) => {
    await db.answers
      .findByPk(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };

  create = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    let isValid = false;
    if (req.body.user_id == "") req.body.user_id = null;
    if (req.body.task_id == "") req.body.task_id = null;
    if (req.body.answer == "") req.body.answer = null;
    await db.users.findByPk(req.body.user_id).then((data) => {
      if (data && data.role_id === Roles.student) isValid = true;
    });
    if (isValid) {
      await db.careerGuidanceBranches
        .create({
          user_id: req.body.user_id,
          task_id: req.body.task_id,
          answer: req.body.answer,
        })
        .then((record) => {
          res.send(`Answer ${record.id} was created`);
          console.log(`Answer ${record.id} created`);
        })
        .catch((err) => {
          res.send(`Something went wrong...`);
          console.error(err.original?.sqlMessage || err);
        });
    } else {
      res.send(`User is not an university`);
    }
  };

  update = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    await db.answers
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

  delete = async (req: Request, res: Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
    await db.answers
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

export const answersController = new AnswersController();
