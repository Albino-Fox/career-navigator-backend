import { Request, Response } from "express";
import db from "@/database.ts";
import { stringifyJSON } from "@/utils/index.ts";
import { Tasks } from "@/models/tasks";
import { CareerGuidanceBranches } from "@/models/career_guidance_branches";
import { Roles } from "@/types/user";
import { CareerGuidances } from "@/models/career_guidances";
import { Users } from "@/models/users";

class StudentSkillsController {
  getAll = async (req: Request, res: Response) => {
    await db.studentSkills
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
    await db.studentSkills
      .findAll({
        where: { user_id: req.params.id },
        include: [
          {
            model: CareerGuidanceBranches,
            include: [
              { model: CareerGuidances },
              { model: Users, attributes: ["name"] },
            ],
          },
        ],
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };

  getMax = async (req: Request, res: Response) => {
    await db.studentSkills
      .findAll({
        where: { user_id: req.params.id },
        include: [
          {
            model: CareerGuidanceBranches,
            include: [
              { model: CareerGuidances },
              { model: Users, attributes: ["name"] },
            ],
          },
        ],
      })
      .then(async (data) => {
        const merged: { [key: string]: any } = {};

        data.forEach((item: any) => {
          const { university_id, career_guidance_id, level } =
            item.CareerGuidanceBranch;
          const { is_completed } = item;
          const key = `${university_id}-${career_guidance_id}`;

          if (is_completed) {
            if (
              !merged[key] ||
              merged[key].CareerGuidanceBranch.level < level
            ) {
              merged[key] = {
                ...item.get(),
                CareerGuidanceBranch: {
                  ...item.CareerGuidanceBranch.get(),
                  level,
                },
              };
            }
          } else {
            if (!merged[key]) {
              merged[key] = {
                ...item.get(),
                CareerGuidanceBranch: {
                  ...item.CareerGuidanceBranch.get(),
                  level: 0,
                },
              };
            }
          }
        });
        const mergedArray = Object.values(merged);

        res.json(mergedArray);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err);
        console.error(err.original?.sqlMessage);
      });
  };

  create = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    let isValid = false;
    let isHecked = false;
    if (req.body.user_id == "") req.body.user_id = null;
    if (req.body.university_id == "") req.body.university_id = null;
    if (req.body.career_guidance_id == "") req.body.career_guidance_id = null;
    await db.users.findByPk(req.body.user_id).then((data) => {
      if (data && data.role_id === Roles.student) isValid = true;
    });
    if (isValid) {
      let branchesTasks: (CareerGuidanceBranches & {
        Tasks?: { id: number };
      })[] = await db.careerGuidanceBranches.findAll({
        where: {
          university_id: req.body.university_id,
          career_guidance_id: req.body.career_guidance_id,
        },
        include: [{ model: Tasks, attributes: ["id"] }],
      });
      let extractedTasks: { id: number }[] = [];
      branchesTasks.forEach((branchTasks: any) => {
        extractedTasks.push(...branchTasks.Tasks);
      });
      for (let task of extractedTasks) {
        await db.taskStatuses
          .create({
            task_id: task.id,
            user_id: req.body.user_id,
            is_done: false,
          })
          .catch((err) => {
            console.error(err.original?.sqlMessage || err);
          });
      }
      let extractedBranches: { id: number }[] = [];
      branchesTasks.forEach((branchTasks: any) => {
        extractedBranches.push(branchTasks.id);
      });

      for (let branch_id of extractedBranches) {
        await db.studentSkills
          .create({
            user_id: req.body.user_id,
            career_guidance_branch_id: branch_id,
            is_completed: false,
          })
          .then((record) => {
            console.log(`Student's skill ${record.id} added`);
          })
          .catch((err) => {
            console.error(err.original?.sqlMessage || err);
            isHecked = true;
          });
      }
      if (isHecked) res.send(`Something went wrong...`);
      else
        res.send(
          `Final: ${[...extractedBranches]} were created + filled task_statuses`,
        );
    } else {
      res.send(`User is not a student`);
    }
  };

  update = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    await db.studentSkills
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
    await db.studentSkills
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

export const studentSkillsController = new StudentSkillsController();
