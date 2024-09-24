import { Sequelize, DataTypes, Model } from "sequelize";

export class CareerGuidanceBranches extends Model {
  declare id: number;
  public career_guidance_id!: number;
  public level!: number;
  public university_id!: number;
}

export const initCareerGuidanceBranches = (sequelize: Sequelize): Model => {
  CareerGuidanceBranches.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      career_guidance_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      university_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "career_guidance_branches",
    },
  );
  return new CareerGuidanceBranches();
};
