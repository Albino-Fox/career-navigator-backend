import { Request, Response } from "express";
import { stringifyJSON } from "@/utils/index.ts";

import { competencyStatusesService } from "@/services/competency_statuses";

class CompetencyStatusStatusesController {
  getAllCompetencyStatuses = async (req: Request, res: Response) => {
    let data = await competencyStatusesService.getAllCompetencyStatuses();

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      res.status(200).json(data);
    }
  };

  getCompetencyStatus = async (req: Request, res: Response) => {
    let data = await competencyStatusesService.getCompetencyStatus(
      +req.params.id,
    );

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      if (data === null) {
        res.status(400).send(`Record with id ${+req.params.id} is not found`);
      } else res.status(200).json(data);
    }
  };

  createCompetencyStatus = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    let data = await competencyStatusesService.createCompetencyStatus({
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

  updateCompetencyStatus = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    let data = await competencyStatusesService.updateCompetencyStatus({
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

  deleteCompetencyStatus = async (req: Request, res: Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
    let id = +req.body.id;

    if (!isNaN(id)) {
      let data = await competencyStatusesService.deleteCompetencyStatus({
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

export const competencyStatusesController =
  new CompetencyStatusStatusesController();
