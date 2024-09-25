import { Request, Response } from "express";
import db from "@/database.ts";
import { stringifyJSON } from "@/utils/index.ts";
import { Roles } from "@/types/user";
import { CareerGuidances } from "@/models/career_guidances";
import { Vacancies } from "@/models/vacancies";

class VacanciesController {
  getAll = async (req: Request, res: Response) => {
    await db.vacancies
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
    await db.vacancies
      .findByPk(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };

  getFromUser = async (req: Request, res: Response) => {
    await db.vacancies
      .findAll({
        where: { employer_id: req.params.user_id },
        include: [{ model: CareerGuidances, attributes: ["name"] }],
      })
      .then((data: (Vacancies & { CareerGuidance?: { name: string } })[]) => {
        let joinedData = data.map((item) => {
          return {
            id: item.id,
            title: item.name,
            skillTitle: item["CareerGuidance"]!.name,
            skillId: item.career_guidance_id,
            level: item.level,
            description: item.description,
            is_taken: item.is_taken,
          };
        });
        res.json(joinedData);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage);
      });
  };

  create = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    let isValid = false;
    if (req.body.title == "") req.body.title = null;
    if (req.body.skill == "") req.body.skill = null;
    if (req.body.level == "") req.body.level = null;
    await db.users.findByPk(req.body.employer_id).then((data) => {
      if (data && data.role_id === Roles.employer) isValid = true;
    });
    if (isValid) {
      await db.vacancies
        .create({
          employer_id: req.body.employer_id,
          name: req.body.title,
          description: req.body.description,
          career_guidance_id: req.body.career_guidance_id,
          is_taken: false,
          user_id: null,
          level: req.body.level,
        })
        .then((record) => {
          res.send(`Vacancy ${record.id} was created`);
          console.log(`Vacancy ${record.id} created`);
        })
        .catch((err) => {
          res.send(`Something went wrong...`);
          console.error(err.original?.sqlMessage || err);
        });
    } else {
      res.send(`User is not an employer`);
    }
  };

  update = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    await db.vacancies
      .update(
        {
          name: req.body.name,
          description: req.body.description,
          career_guidance_id: req.body.career_guidance_id,
          level: req.body.level,
        },
        {
          where: { id: req.params.id, employer_id: req.body.employer_id },
        },
      )
      .then((result) => {
        if (result[0] === 1) {
          // one by one
          res.send(`Vacancy ${req.params.id} was updated`);
        } else {
          res.send(`Vacancy ${req.params.id} was not updated...`);
        }
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage || err);
      });
  };

  delete = async (req: Request, res: Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
    await db.vacancies
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

export const vacanciesController = new VacanciesController();
