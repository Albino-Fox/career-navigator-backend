import { Sequelize, DataTypes, Model } from "sequelize";

export class Answers extends Model {
  declare id: number;
  public user_id!: number;
  public task_id!: number;
  public answer!: string;
  public status!: string;
}

export const initAnswers = (sequelize: Sequelize): Model => {
  Answers.init(
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
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING(9999),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "answers",
    },
  );
  return new Answers();
};
