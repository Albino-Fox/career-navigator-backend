import { Sequelize, DataTypes, Model } from "sequelize";

export class Vacancies extends Model {
  public id!: number;
  public employer_id!: number;
  public name!: string;
  public description!: string;
  public career_guidance_id!: number;
  public exam_id!: number;
}

export const initVacancies = (sequelize: Sequelize): Model => {
  Vacancies.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "vacancies",
    },
  );
  return new Vacancies();
};
