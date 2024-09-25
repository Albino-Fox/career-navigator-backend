import { Request, Response } from "express";
import db from "@/database.ts";
import { stringifyJSON } from "@/utils/index.ts";

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

  create = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    let isValid = false;
    await db.users.findByPk(req.body.employer_id).then((data) => {
      if (data && data.role_id === 2) isValid = true;
    });
    if (isValid) {
      await db.tasks
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
          res.send(`Task ${record.id} was created`);
          console.log(`Task ${record.id} created`);
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
