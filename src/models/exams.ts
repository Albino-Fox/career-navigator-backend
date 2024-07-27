import { Sequelize, DataTypes, Model } from "sequelize";

export class Exams extends Model {
  declare id: number;
  public name!: string;
  public description!: string;
  public task_id!: number;
}

export const initExams = (sequelize: Sequelize): Model => {
  Exams.init(
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "exams",
    },
  );
  return new Exams();
};
