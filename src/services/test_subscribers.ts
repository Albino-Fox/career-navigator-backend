import db from "@/database.ts";

class TestSubscribersService {
  getAllTestSubscribers = async () => {
    return await db.testSubscribers
      .findAll()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.original?.sqlMessage;
      });
  };

  getTestSubscriber = async (id: number) => {
    return await db.testSubscribers
      .findByPk(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.original?.sqlMessage;
      });
  };

  createTestSubscriber = async (data: { username: string; time: Date }) => {
    return await db.testSubscribers
      .create({
        username: data.username,
        subscription_date: data.time,
      })
      .then((record) => {
        return `${record.id} was created`;
      })
      .catch((err) => {
        return err.original?.sqlMessage || err;
      });
  };

  updateTestSubscriber = async (data: {
    key: string;
    value: string;
    id: number;
  }) => {
    return await db.testSubscribers
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

  deleteTestSubscriber = async (data: { id: number }) => {
    return await db.testSubscribers
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

export const testSubscribersService = new TestSubscribersService();
