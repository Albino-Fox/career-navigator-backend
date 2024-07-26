import { Sequelize, DataTypes, Model } from "sequelize";

export class CareerGuidance extends Model {
  public id!: number;
  public name!: string;
  public competency_id!: number;
}

export const initCareerGuidance = (sequelize: Sequelize): Model => {
  CareerGuidance.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      competency_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "career_guidance",
    },
  );
  return new CareerGuidance();
};
