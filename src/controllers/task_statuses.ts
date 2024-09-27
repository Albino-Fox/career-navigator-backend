import { Request, Response } from "express";
import db from "@/database.ts";
import { stringifyJSON } from "@/utils/index.ts";

class TaskStatusesController {
  getAll = async (req: Request, res: Response) => {
    await db.taskStatuses
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
    await db.taskStatuses
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
    await db.taskStatuses
      .create({
        // TODO: Add proper fields
        // username: req.body.username,
        // subscription_date: new Date(Date.now()).toString(),
      })
      .then((record) => {
        res.send(`${record.id} was created`);
        console.log(`Task status ${record.id} created`);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage || err);
      });
  };

  update = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    // TODO: nail it :3c
    let isSuccessfulUpdate = false;
    await db.taskStatuses
      .update(
        { is_done: req.body.is_done },
        {
          where: { task_id: req.body.task_id },
        },
      )
      .then((result) => {
        if (result[0] === 1) {
          // one by one
          res.send(
            `${req.body.key} of ${req.body.id} has been changed to ${req.body.value}`,
          );
          isSuccessfulUpdate = true;
        } else {
          res.send(`${req.body.key} of ${req.body.id} was not updated...`);
        }
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage || err);
      });
    if (isSuccessfulUpdate) {
      // TODO: Check branch completion and mark "is_completed" on all/all
    }
  };

  delete = async (req: Request, res: Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
    await db.taskStatuses
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

export const taskStatusesController = new TaskStatusesController();
