import db from "@/database.ts";

class CompetencyStatusesService {
  getAllCompetencyStatuses = async () => {
    return await db.competencyStatuses
      .findAll()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.original?.sqlMessage;
      });
  };

  getCompetencyStatus = async (id: number) => {
    return await db.competencyStatuses
      .findByPk(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.original?.sqlMessage;
      });
  };

  createCompetencyStatus = async (data: { username: string }) => {
    return await db.competencyStatuses
      .create({
        // TODO: insert proper fields
        // username: data.username,
        // subscription_date: data.time,
      })
      .then((record) => {
        return `CompetencyStatus ${record.id} was created`;
      })
      .catch((err) => {
        return err.original?.sqlMessage || err;
      });
  };

  updateCompetencyStatus = async (data: {
    key: string;
    value: string;
    id: number;
  }) => {
    return await db.competencyStatuses
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

  deleteCompetencyStatus = async (data: { id: number }) => {
    return await db.competencyStatuses
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

export const competencyStatusesService = new CompetencyStatusesService();
