import { Request, Response } from "express";
import db from "@/database.ts";
import { stringifyJSON } from "@/utils/index.ts";
import { Applications } from "@/models/applications";
import { Users } from "@/models/users";
import { StudentSkills } from "@/models/student_skills";
import { CareerGuidanceBranches } from "@/models/career_guidance_branches";
import { CareerGuidances } from "@/models/career_guidances";

class ApplicationsController {
  getAll = async (req: Request, res: Response) => {
    await db.applications
      .findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };

  getOfUser = async (req: Request, res: Response) => {
    let counter = 0;
    await db.vacancies
      .findAll({
        where: { employer_id: req.params.id },
        include: [
          {
            model: Applications,
            attributes: ["id", "user_id"],
            required: true,
            include: [
              {
                model: Users,
                attributes: [
                  "name",
                  "surname",
                  "patronymic",
                  "email",
                  "phone_number",
                ],
              },
            ],
          },
          { model: CareerGuidances, attributes: ["name"] },
        ],
      })
      .then(async (vacanciesOriginal: any) => {
        let vacancies = JSON.parse(JSON.stringify(vacanciesOriginal));
        if (vacancies) {
          for (let i = 0; i < vacancies.length; i++) {
            for (let j = 0; j < vacancies[i].Applications.length; j++) {
              try {
                console.log("counter " + counter);
                let skills = await db.studentSkills.findAll({
                  where: {
                    user_id: vacancies[i].Applications[j].user_id,
                    is_completed: true,
                  },
                  attributes: ["career_guidance_branch_id"],
                  include: [
                    {
                      model: CareerGuidanceBranches,
                      where: {
                        career_guidance_id: vacancies[i].career_guidance_id,
                      },
                      attributes: [
                        "career_guidance_id",
                        "level",
                        "university_id",
                      ],
                      include: [
                        { model: CareerGuidances, attributes: ["name"] },
                        { model: Users, attributes: ["name"] },
                      ],
                    },
                  ],
                });

                skills = skills.filter(
                  (item: any) =>
                    item.CareerGuidanceBranch?.level >= vacancies[0].level,
                );
                Object.assign(vacancies[i].Applications[j], { Skills: skills });
              } catch (err) {
                console.error(err);
              }
            }
          }
          res.json(vacancies);
        } else {
          throw Error("no data");
        }
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.log(err);
        console.error(err.original?.sqlMessage);
      });
  };

  checkApplication = async (req: Request, res: Response) => {
    await db.applications
      .findOne({
        where: { id: req.body.user_id, vacancy_id: req.body.vacancy_id },
      })
      .then((data) => {
        if (data) {
          res.json(true);
        } else {
          res.json(false);
        }
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };

  create = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    await db.applications
      .create({
        user_id: req.body.user_id,
        vacancy_id: req.body.vacancy_id,
      })
      .then((record) => {
        res.send(`${record.id} was created`);
        console.log(`Career guidance ${record.id} created`);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage || err);
      });
  };

  update = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    await db.applications
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
    await db.applications
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

export const applicationsController = new ApplicationsController();
