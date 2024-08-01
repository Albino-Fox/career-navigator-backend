import { Request, Response } from "express";
import { stringifyJSON } from "@/utils/index.ts";

import { careerGuidanceQuestionsService } from "@/services/career_guidance_questions";

class CareerGuidanceQuestionsController {
  getAllCareerGuidanceQuestions = async (req: Request, res: Response) => {
    let data =
      await careerGuidanceQuestionsService.getAllCareerGuidanceQuestions();

    if (data instanceof Error) {
      res.status(400).send(`Something went wrong...`);
      console.error(data);
    } else {
      res.status(200).json(data);
    }
  };

  getCareerGuidanceQuestion = async (req: Request, res: Response) => {
    let data = await careerGuidanceQuestionsService.getCareerGuidanceQuestion(
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

  createCareerGuidanceQuestion = async (req: Request, res: Response) => {
    console.log(`Recieved CREATE request: ${stringifyJSON(req.body)}`);
    let data =
      await careerGuidanceQuestionsService.createCareerGuidanceQuestion({
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

  updateCareerGuidanceQuestion = async (req: Request, res: Response) => {
    console.log(`Recieved UPDATE request: ${stringifyJSON(req.body)}`);
    let data =
      await careerGuidanceQuestionsService.updateCareerGuidanceQuestion({
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

  deleteCareerGuidanceQuestion = async (req: Request, res: Response) => {
    console.log(`Recieved DELETE request: ${stringifyJSON(req.body)}`);
    let id = +req.body.id;

    if (!isNaN(id)) {
      let data =
        await careerGuidanceQuestionsService.deleteCareerGuidanceQuestion({
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

export const careerGuidanceQuestionsController =
  new CareerGuidanceQuestionsController();
