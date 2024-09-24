import { Sequelize, DataTypes, Model } from "sequelize";

export class Tasks extends Model {
  declare id: number;
  public name!: string;
  public description!: string;
  public level!: number;
  public career_guidance_id!: number;
}

export const initTasks = (sequelize: Sequelize): Model => {
  Tasks.init(
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
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      career_guidance_branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "tasks",
    },
  );
  return new Tasks();
};
