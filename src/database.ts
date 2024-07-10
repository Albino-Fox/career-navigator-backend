const config = require('@/config.ts');
import { Sequelize } from 'sequelize';
const TestSubscribers = require('@/models/test_subscribers.ts');

class Database {
  public sequelize: Sequelize | undefined;
  public testSubscribers: Sequelize | undefined;
  
  constructor() {
    this.connectToDatabase();
    this.testSubscribers =  TestSubscribers( this.sequelize);
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      host: config.db_host,
      username: config.db_user,
      password: config.db_password,
      database: config.db_name,
      dialect: config.db_dialect
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