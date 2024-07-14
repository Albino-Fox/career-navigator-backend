import { Dialect } from "sequelize";
require('dotenv').config();

export default {
  port: +process.env.PORT!, // must be a number, so converts to number
  host: process.env.APP_HOST!,
  db_host: process.env.DB_HOST!,
  db_user: process.env.DB_USER!,
  db_password: process.env.DB_PASSWORD!,
  db_name: process.env.DB_NAME!,
  db_dialect: process.env.DB_DIALECT! as Dialect,
}