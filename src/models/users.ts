import { Sequelize, DataTypes, Model } from "sequelize";

export class Users extends Model {
  public id!: number;
  public name!: string;
  public surname!: string;
  public patronymic!: string;
  public birth_date!: Date;
  public phone_number!: string;
  public login!: string;
  public email!: string;
  public password!: string;
  public role_id!: number;
  public career_guidance_id!: number;
}

export const initUsers = (sequelize: Sequelize): Model => {
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      patronymic: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      career_guidance_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "users",
    },
  );
  return new Users();
};
