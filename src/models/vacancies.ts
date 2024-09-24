import { Sequelize, DataTypes, Model } from "sequelize";

export class Vacancies extends Model {
  declare id: number;
  public employer_id!: number;
  public name!: string;
  public description!: string;
  public career_guidance_id!: number;
  public is_taken!: boolean;
  public user_id!: number;
  public level!: number;
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
      is_taken: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      level: {
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
