import { Request, Response } from "express";
import db from "@/database.ts";
import { stringifyJSON } from "@/utils/index.ts";
import { Roles } from "@/types/user";
import { Tasks } from "@/models/tasks";

class TasksController {
  getAllTasks = async (req: Request, res: Response) => {
    await db.tasks
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
    await db.tasks
      .findByPk(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };

  getFromBranch = async (req: Request, res: Response) => {
    await db.tasks
      .findAll({
        where: { career_guidance_branch_id: req.params.branch_id },
      })
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
    if (req.body.name == "") req.body.name = null;
    if (req.body.career_guidance_branch_id == "")
      req.body.career_guidance_branch_id = null;
    await db.users.findByPk(req.body.university_id).then((data) => {
      if (data && data.role_id === Roles.university) isValid = true;
    });
    if (isValid) {
      await db.tasks
        .create({
          name: req.body.name,
          description: req.body.description,
          career_guidance_branch_id: req.body.career_guidance_branch_id,
        })
        .then((record) => {
          res.send(`Task ${record.id} was created`);
          console.log(`Task ${record.id} created`);
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
    let isValid = false;
    await db.users.findByPk(req.body.university_id).then((data) => {
      if (data && data.role_id === Roles.university) isValid = true;
    });
    if (isValid) {
      await db.tasks
        .update(
          {
            name: req.body.name,
            description: req.body.description,
          },
          {
            where: { id: req.body.id },
          },
        )
        .then((result) => {
          if (result[0] === 1) {
            // one by one
            res.send(`Task ${req.body.id} was updated`);
          } else {
            res.send(`Task ${req.body.id} was not updated...`);
          }
        })
        .catch((err) => {
          res.send(`Something went wrong...`);
          console.error(err.original?.sqlMessage || err);
        });
    } else {
      res.send(`User is not an university`);
    }
  };

  delete = async (req: Request, res: Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
    await db.tasks
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

export const tasksController = new TasksController();
