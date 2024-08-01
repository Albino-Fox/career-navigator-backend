import db from "@/database.ts";

class ExamStatusesService {
  getAllExamStatuses = async () => {
    return await db.examStatuses
      .findAll()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.original?.sqlMessage;
      });
  };

  getExamStatus = async (id: number) => {
    return await db.examStatuses
      .findByPk(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.original?.sqlMessage;
      });
  };

  createExamStatus = async (data: { username: string }) => {
    return await db.examStatuses
      .create({
        // TODO: insert proper fields
        // username: data.username,
        // subscription_date: data.time,
      })
      .then((record) => {
        return `ExamStatus ${record.id} was created`;
      })
      .catch((err) => {
        return err.original?.sqlMessage || err;
      });
  };

  updateExamStatus = async (data: {
    key: string;
    value: string;
    id: number;
  }) => {
    return await db.examStatuses
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

  deleteExamStatus = async (data: { id: number }) => {
    return await db.examStatuses
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

export const examStatusesService = new ExamStatusesService();
