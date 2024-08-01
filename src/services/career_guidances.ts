import db from "@/database.ts";

class CareerGuidancesService {
  getAllCareerGuidances = async () => {
    return await db.careerGuidances
      .findAll()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.original?.sqlMessage;
      });
  };

  getCareerGuidance = async (id: number) => {
    return await db.careerGuidances
      .findByPk(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.original?.sqlMessage;
      });
  };

  createCareerGuidance = async (data: { username: string }) => {
    return await db.careerGuidances
      .create({
        // TODO: insert proper fields
        // username: data.username,
        // subscription_date: data.time,
      })
      .then((record) => {
        return `CareerGuidance ${record.id} was created`;
      })
      .catch((err) => {
        return err.original?.sqlMessage || err;
      });
  };

  updateCareerGuidance = async (data: {
    key: string;
    value: string;
    id: number;
  }) => {
    return await db.careerGuidances
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

  deleteCareerGuidance = async (data: { id: number }) => {
    return await db.careerGuidances
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

export const careerGuidancesService = new CareerGuidancesService();
