import { Sequelize, DataTypes, Model } from "sequelize";

export class Applications extends Model {
  declare id: number;
  public user_id!: number;
  public vacancy_id!: number;
}

export const initApplications = (sequelize: Sequelize): Model => {
  Applications.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vacancy_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "applications",
    },
  );
  return new Applications();
};
