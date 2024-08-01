import { Request, Response } from "express";
import { stringifyJSON } from "@/utils/index.ts";

import { examStatusesService } from "@/services/exam_statuses";

class ExamStatusesController {
  getAllExamStatuses = async (req: Request, res: Response) => {
    let data = await examStatusesService.getAllExamStatuses();

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      res.status(200).json(data);
    }
  };

  getExamStatus = async (req: Request, res: Response) => {
    let data = await examStatusesService.getExamStatus(+req.params.id);

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      if (data === null) {
        res.status(400).send(`Record with id ${+req.params.id} is not found`);
      } else res.status(200).json(data);
    }
  };

  createExamStatus = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    let data = await examStatusesService.createExamStatus({
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

  updateExamStatus = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    let data = await examStatusesService.updateExamStatus({
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

  deleteExamStatus = async (req: Request, res: Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
    let id = +req.body.id;

    if (!isNaN(id)) {
      let data = await examStatusesService.deleteExamStatus({
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

export const examStatusesController = new ExamStatusesController();
