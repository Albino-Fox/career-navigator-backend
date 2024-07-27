import { Sequelize, DataTypes, Model } from "sequelize";

export class ExamTasks extends Model {
  declare id: number;
  public name!: string;
  public exam_id!: number;
}

export const initExamTasks = (sequelize: Sequelize): Model => {
  ExamTasks.init(
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
      exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "exam_tasks",
    },
  );
  return new ExamTasks();
};
