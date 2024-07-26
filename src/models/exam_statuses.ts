import { Sequelize, DataTypes, Model } from "sequelize";

export class ExamStatuses extends Model {
  public exam_id!: number;
  public user_id!: number;
  public status!: boolean;
}

export const initExamStatuses = (sequelize: Sequelize): Model => {
  ExamStatuses.init(
    {
      exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "exam_statuses",
    },
  );
  return new ExamStatuses();
};
