import { Request, Response } from "express";
import { stringifyJSON } from "@/utils/index.ts";

import { universitiesService } from "@/services/universities";

class UniversitiesController {
  getAllUniversities = async (req: Request, res: Response) => {
    let data = await universitiesService.getAllUniversities();

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      res.status(200).json(data);
    }
  };

  getUniversity = async (req: Request, res: Response) => {
    let data = await universitiesService.getUniversity(+req.params.id);

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      if (data === null) {
        res.status(400).send(`Record with id ${+req.params.id} is not found`);
      } else res.status(200).json(data);
    }
  };

  createUniversity = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    let data = await universitiesService.createUniversity({
      // WARNING: Use appropriate fields
      username: req.body.name,
    });

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  };

  updateUniversity = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    let data = await universitiesService.updateUniversity({
      id: +req.body.id,
      key: req.body.key,
      value: req.body.value,
    });

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  };

  deleteUniversity = async (req: Request, res: Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
    let id = +req.body.id;

    if (!isNaN(id)) {
      let data = await universitiesService.deleteUniversity({
        id,
      });

      if (data instanceof Error) {
        res.status(400).send(`Something went wrong...`);
        console.error(data);
      } else {
        res.status(200).send(data);
        console.log(data);
      }
    } else {
      res.status(400).send(`Malformed id`);
    }
  };
}

export const universitiesController = new UniversitiesController();
