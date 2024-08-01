import { Request, Response } from "express";
import { stringifyJSON } from "@/utils/index.ts";

import { examTasksService } from "@/services/exam_tasks";

class ExamTasksController {
  getAllExamTasks = async (req: Request, res: Response) => {
    let data = await examTasksService.getAllExamTasks();

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      res.status(200).json(data);
    }
  };

  getExamTask = async (req: Request, res: Response) => {
    let data = await examTasksService.getExamTask(+req.params.id);

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      if (data === null) {
        res.status(400).send(`Record with id ${+req.params.id} is not found`);
      } else res.status(200).json(data);
    }
  };

  createExamTask = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    let data = await examTasksService.createExamTask({
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

  updateExamTask = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    let data = await examTasksService.updateExamTask({
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

  deleteExamTask = async (req: Request, res: Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
    let id = +req.body.id;

    if (!isNaN(id)) {
      let data = await examTasksService.deleteExamTask({
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

export const examTasksController = new ExamTasksController();
