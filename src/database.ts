const config = require('@/config.ts');
import { Sequelize, DataTypes } from 'sequelize';

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }
  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      host: config.db_host,
      username: config.db_user,
      password: config.db_password,
      database: config.db_name,
      dialect: config.db_dialect,
    });
    
    await this.sequelize
      .authenticate()
      .then(() => {
        console.log('Connection established.');
      })
      .catch((err) => {
        console.error(`Connection failed: ${err}`);
      });
  }
}

module.exports = Database;