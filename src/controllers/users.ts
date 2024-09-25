import { Request, Response } from "express";
import db from "@/database.ts";
import { stringifyJSON } from "@/utils/index.ts";

class UsersController {
  getAll = async (req: Request, res: Response) => {
    await db.users
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
    await db.users
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
    await db.users
      .create({
        name: req.body.name,
        surname: req.body.surname,
        patronymic: req.body.patronymic,
        focus: null,
        is_completing: false,
        description: null,
        phone_number: req.body.phone_number,
        email: req.body.email,
        password: req.body.password,
        role_id: 1,
      })
      .then((record) => {
        res.send(`${record.id} was created`);
        console.log(`User ${record.id} created`);
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage || err);
      });
  };

  updateProfile = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    await db.users
      .update(
        {
          name: req.body.name,
          surname: req.body.surname,
          patronymic: req.body.patronymic,
        },
        {
          where: { id: req.params.id },
        },
      )
      .then((result) => {
        if (result[0] === 1) {
          // one by one
          res.send(`User ${req.params.id} has been updated`);
        } else {
          res.send(`User ${req.params.id} was not updated...`);
        }
      })
      .catch((err) => {
        res.send(`Something went wrong...`);
        console.error(err.original?.sqlMessage || err);
      });
  };

  delete = async (req: Request, res: Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
    await db.users
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

export const usersController = new UsersController();
