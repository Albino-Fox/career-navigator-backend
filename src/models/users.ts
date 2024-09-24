import { Sequelize, DataTypes, Model } from "sequelize";

export class Users extends Model {
  declare id: number;
  public name!: string;
  public surname!: string;
  public patronymic!: string;
  public phone_number!: string;
  public focus_vacancy_id!: number;
  public is_completing!: boolean;
  public email!: string;
  public password!: string;
  public description!: string;
  public role_id!: number;
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
      phone_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      focus_vacancy_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_completing: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(9999),
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
