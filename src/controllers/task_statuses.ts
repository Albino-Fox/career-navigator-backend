import { Request, Response } from "express";
import db from "@/database.ts";
import { stringifyJSON } from "@/utils/index.ts";
import { Tasks } from "@/models/tasks";
import { CareerGuidanceBranches } from "@/models/career_guidance_branches";
import { TaskStatuses } from "@/models/task_statuses";

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
    let isSuccessfulUpdate = false;
    if (req.body.is_done == "") req.body.is_done = null;
    if (req.body.task_id == "") req.body.task_id = null;
    if (req.body.user_id == "") req.body.user_id = null;
    await db.taskStatuses
      .update(
        { is_done: req.body.is_done },
        {
          where: { task_id: req.body.task_id, user_id: req.body.user_id },
        },
      )
      .then((result) => {
        if (result[0] === 1) {
          // one by one
          isSuccessfulUpdate = true;
          res.send(`TaskStatus ${req.body.is_done} was updated`);
        } else {
          res.send(`TaskStatus ${req.body.is_done} was not updated...`);
        }
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage || err);
      });
    if (isSuccessfulUpdate) {
      let user_id = await db.taskStatuses.findOne({
        where: { task_id: req.body.task_id, user_id: req.body.user_id },
        attributes: ["user_id"],
      });
      let task = await db.tasks.findOne({
        where: { id: req.body.task_id },
        attributes: ["career_guidance_branch_id"],
      });
      if (task && user_id) {
        let total = await db.tasks.count({
          where: { career_guidance_branch_id: task.career_guidance_branch_id },
        });
        let completed = await db.tasks.count({
          where: { career_guidance_branch_id: task.career_guidance_branch_id },
          include: [
            {
              model: TaskStatuses,
              where: { is_done: true, user_id: req.body.user_id },
            },
          ],
        });
        if (total === completed && user_id)
          await db.studentSkills
            .update(
              { is_completed: true },
              {
                where: {
                  career_guidance_branch_id: task.career_guidance_branch_id,
                  user_id: user_id.user_id,
                },
              },
            )
            .then((data) => {
              if (data) console.log("student skill was marked as DONE?");
            })
            .catch((err) => console.error(err.original?.sqlMessage || err));
      }
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
