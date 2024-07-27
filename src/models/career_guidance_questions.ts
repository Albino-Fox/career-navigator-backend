import { Sequelize, DataTypes, Model } from "sequelize";

export class CareerGuidanceQuestions extends Model {
  declare id: number;
  public name!: string;
  public description!: string;
}

export const initCareerGuidanceQuestions = (sequelize: Sequelize): Model => {
  CareerGuidanceQuestions.init(
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
        type: DataTypes.STRING(9999),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "career_guidance_questions",
    },
  );
  return new CareerGuidanceQuestions();
};
