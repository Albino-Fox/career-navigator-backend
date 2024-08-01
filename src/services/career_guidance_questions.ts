import db from "@/database.ts";

class CareerGuidanceQuestionsService {
  getAllCareerGuidanceQuestions = async () => {
    return await db.careerGuidanceQuestions
      .findAll()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.original?.sqlMessage;
      });
  };

  getCareerGuidanceQuestion = async (id: number) => {
    return await db.careerGuidanceQuestions
      .findByPk(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.original?.sqlMessage;
      });
  };

  createCareerGuidanceQuestion = async (data: { username: string }) => {
    return await db.careerGuidanceQuestions
      .create({
        // TODO: insert proper fields
        // username: data.username,
        // subscription_date: data.time,
      })
      .then((record) => {
        return `CareerGuidanceQuestion ${record.id} was created`;
      })
      .catch((err) => {
        return err.original?.sqlMessage || err;
      });
  };

  updateCareerGuidanceQuestion = async (data: {
    key: string;
    value: string;
    id: number;
  }) => {
    return await db.careerGuidanceQuestions
      .update(
        { [data.key]: data.value },
        {
          where: { id: data.id },
        },
      )
      .then((result) => {
        if (result[0] === 1) {
          // one by one
          return `${data.key} of ${data.id} has been changed to ${data.value}`;
        } else {
          return `${data.key} of ${data.id} was not updated...`;
        }
      })
      .catch((err) => {
        return err.original?.sqlMessage || err;
      });
  };

  deleteCareerGuidanceQuestion = async (data: { id: number }) => {
    return await db.careerGuidanceQuestions
      .destroy({
        where: {
          id: data.id,
        },
      })
      .then((result) => {
        if (result === 1) {
          return `${data.id} has been deleted.`;
        } else {
          return `${data.id} is not found`;
        }
      })
      .catch((err) => {
        return err.original?.sqlMessage || err;
      });
  };
}

export const careerGuidanceQuestionsService =
  new CareerGuidanceQuestionsService();
