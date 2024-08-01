import db from "@/database.ts";

class VacanciesService {
  getAllVacancies = async () => {
    return await db.vacancies
      .findAll()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.original?.sqlMessage;
      });
  };

  getVacancy = async (id: number) => {
    return await db.vacancies
      .findByPk(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.original?.sqlMessage;
      });
  };

  createVacancy = async (data: { username: string }) => {
    return await db.vacancies
      .create({
        // TODO: insert proper fields
        // username: data.username,
        // subscription_date: data.time,
      })
      .then((record) => {
        return `Vacancy ${record.id} was created`;
      })
      .catch((err) => {
        return err.original?.sqlMessage || err;
      });
  };

  updateVacancy = async (data: { key: string; value: string; id: number }) => {
    return await db.vacancies
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

  deleteVacancy = async (data: { id: number }) => {
    return await db.vacancies
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

export const vacanciesService = new VacanciesService();
