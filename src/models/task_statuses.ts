import { Sequelize, DataTypes, Model } from "sequelize";

export class TaskStatuses extends Model {
  declare id: number;
  public user_id!: number;
  public status!: boolean;
}

export const initTaskStatuses = (sequelize: Sequelize): Model => {
  TaskStatuses.init(
    {
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "task_statuses",
    },
  );
  return new TaskStatuses();
};
