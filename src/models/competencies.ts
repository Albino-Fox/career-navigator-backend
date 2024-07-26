import { Sequelize, DataTypes, Model } from "sequelize";

export class Comptenecies extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public career_guidance_id!: number;
}

export const initCompetencies = (sequelize: Sequelize): Model => {
  Comptenecies.init(
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
        allowNull: true,
      },
      career_guidance_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "comptenecies",
    },
  );
  return new Comptenecies();
};
