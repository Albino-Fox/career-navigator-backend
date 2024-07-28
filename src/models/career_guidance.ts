import { Sequelize, DataTypes, Model } from "sequelize";

export class CareerGuidance extends Model {
  declare id: number;
  public name!: string;
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
    },
    {
      sequelize,
      timestamps: false,
      tableName: "career_guidance",
    },
  );
  return new CareerGuidance();
};
