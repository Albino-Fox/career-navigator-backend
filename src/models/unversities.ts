import { Sequelize, DataTypes, Model } from "sequelize";

export class Universities extends Model {
  declare id: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public description!: string;
  public career_guidance_id!: number;
}

export const initUniversities = (sequelize: Sequelize): Model => {
  Universities.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
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
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "universities",
    },
  );
  return new Universities();
};
