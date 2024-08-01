import { Request, Response } from "express";
import { stringifyJSON } from "@/utils/index.ts";

import { competenciesService } from "@/services/competencies";

class CompetenciesController {
  getAllCompetencies = async (req: Request, res: Response) => {
    let data = await competenciesService.getAllCompetencies();

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      res.status(200).json(data);
    }
  };

  getCompetency = async (req: Request, res: Response) => {
    let data = await competenciesService.getCompetency(+req.params.id);

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      if (data === null) {
        res.status(400).send(`Record with id ${+req.params.id} is not found`);
      } else res.status(200).json(data);
    }
  };

  createCompetency = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    let data = await competenciesService.createCompetency({
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

  updateCompetency = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    let data = await competenciesService.updateCompetency({
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

  deleteCompetency = async (req: Request, res: Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
    let id = +req.body.id;

    if (!isNaN(id)) {
      let data = await competenciesService.deleteCompetency({
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

export const competenciesController = new CompetenciesController();
