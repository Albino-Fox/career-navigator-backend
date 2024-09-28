import { Request, Response } from "express";
import db from "@/database.ts";
import { stringifyJSON } from "@/utils/index.ts";
import { Roles } from "@/types/user";
import { CareerGuidances } from "@/models/career_guidances";
import { CareerGuidanceBranches } from "@/models/career_guidance_branches";
import { Tasks } from "@/models/tasks";
import { TaskStatuses } from "@/models/task_statuses";

class CareerGuidanceBranchesController {
  getAll = async (req: Request, res: Response) => {
    await db.careerGuidanceBranches
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
    console.log(req.params.id);
    await db.careerGuidanceBranches
      .findOne({
        where: { id: req.params.id },
        include: [{ model: CareerGuidances, attributes: ["name"] }],
      })
      .then(
        (
          item:
            | (CareerGuidanceBranches & {
                CareerGuidance?: { name: string };
              })
            | null,
        ) => {
          if (item) {
            let joinedData = {
              id: item.id,
              skillTitle: item["CareerGuidance"]!.name,
              skillId: item.career_guidance_id,
              level: item.level,
            };
            res.json(joinedData);
          } else {
            throw new Error("Something went wrong while fetching data");
          }
        },
      )
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };

  getFrom = async (req: Request, res: Response) => {
    await db.careerGuidanceBranches
      .findAll({
        where: { university_id: req.params.user_id },
        include: [{ model: CareerGuidances, attributes: ["name"] }],
      })
      .then(
        (
          data: (CareerGuidanceBranches & {
            CareerGuidance?: { name: string };
          })[],
        ) => {
          let joinedData = data.map((item) => {
            return {
              id: item.id,
              skillTitle: item["CareerGuidance"]!.name,
              skillId: item.career_guidance_id,
              level: item.level,
            };
          });
          res.json(joinedData);
        },
      )
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };

  getTasksOfCareerGuidance = async (req: Request, res: Response) => {
    console.log(req.body);
    await db.careerGuidanceBranches
      .findAll({
        where: {
          university_id: req.body.university_id,
          career_guidance_id: req.params.career_guidance_id,
        },
        include: [
          { model: CareerGuidances, attributes: ["name"] },
          {
            model: Tasks,
            attributes: ["name", "description", "id"],
            include: [
              {
                model: TaskStatuses,
                where: { user_id: req.body.user_id },
                attributes: ["is_done"],
                required: false,
              },
            ],
          },
        ],
        order: [["level", "ASC"]],
      })
      .then(
        (
          data: (CareerGuidanceBranches & {
            CareerGuidance?: { name: string };
          } & {
            Tasks?: { name: string; description: string; id: number }[];
          })[],
        ) => {
          let joinedData = data.map((item) => {
            return {
              id: item.id,
              tasks: item["Tasks"],
              level: item.level,
            };
          });
          let completeData = {
            name: data[0]["CareerGuidance"]!.name,
            skillId: data[0].career_guidance_id,
            branches: joinedData,
          };
          res.json(completeData);
        },
      )
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };
  getTasksOfCareerGuidanceAll = async (req: Request, res: Response) => {
    let finalData = [];
    let skills = await db.careerGuidances.findAll().then((data) => data);
    for (let skill of skills) {
      let chunk = await db.careerGuidanceBranches
        .findAll({
          where: {
            university_id: req.body.university_id,
            career_guidance_id: skill.id,
          },
          include: [
            { model: CareerGuidances, attributes: ["name"] },
            { model: Tasks, attributes: ["name", "description", "id"] },
          ],
          order: [["level", "ASC"]],
        })
        .then(
          (
            data: (CareerGuidanceBranches & {
              CareerGuidance?: { name: string };
            } & {
              Tasks?: { name: string; description: string; id: number }[];
            })[],
          ) => {
            let joinedData = data.map((item) => {
              return {
                id: item.id,
                tasks: item["Tasks"],
                level: item.level,
              };
            });
            let completeData = {
              name: data[0]["CareerGuidance"]!.name,
              skillId: data[0].career_guidance_id,
              branches: joinedData,
            };
            return completeData;
          },
        )
        .catch((err) => {
          console.error(err.original?.sqlMessage);
        });
      if (chunk) finalData.push(chunk);
    }
    if (finalData) res.send(finalData);
    else res.send(`Something went wrong...`);
  };

  create = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    let isValid = false;
    if (req.body.level == "") req.body.level = null;
    if (req.body.career_guidance_id == "") req.body.career_guidance_id = null;
    await db.users.findByPk(req.body.university_id).then((data) => {
      if (data && data.role_id === Roles.university) isValid = true;
    });
    if (isValid) {
      await db.careerGuidanceBranches
        .create({
          career_guidance_id: req.body.career_guidance_id,
          level: req.body.level,
          university_id: req.body.university_id,
        })
        .then((record) => {
          res.send(`${record.id} was created`);
          console.log(`Career guidance ${record.id} created`);
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
    await db.careerGuidanceBranches
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
    await db.tasks.destroy({
      where: { career_guidance_branch_id: req.body.id },
    });
    await db.careerGuidanceBranches
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

export const careerGuidanceBranchesController =
  new CareerGuidanceBranchesController();
