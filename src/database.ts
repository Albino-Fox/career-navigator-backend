import config from "@/config.ts";
import { Sequelize } from "sequelize";
import {
  initTestSubscribers,
  TestSubscribers,
} from "./models/test_subscribers";

class Database {
  public sequelize: Sequelize = new Sequelize({
    database: config.db_name,
    username: config.db_user,
    host: config.db_host,
    password: config.db_password,
    dialect: config.db_dialect,
  });

  public testSubscribers = TestSubscribers;

  constructor() {
    this.connectToDatabase();
    initTestSubscribers(this.sequelize);
  }

  private async connectToDatabase() {
    await this.sequelize!.authenticate()
      .then(() => {
        console.log("Connection established.");
      })
      .catch((err) => {
        console.error(`Connection failed: ${err}`);
      });
  }
}

const db = new Database();
export default db;
