import { Sequelize, DataTypes, Model } from "sequelize";

export class CareerGuidances extends Model {
  declare id: number;
  public name!: string;
}

export const initCareerGuidances = (sequelize: Sequelize): Model => {
  CareerGuidances.init(
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
      tableName: "career_guidances",
    },
  );
  return new CareerGuidances();
};
