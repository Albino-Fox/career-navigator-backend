import { Sequelize, DataTypes, Model } from "sequelize";

export class CompetencyStatuses extends Model {
  public competency_id!: number;
  public user_id!: number;
  public status!: boolean;
}

export const initCompetencyStatuses = (sequelize: Sequelize): Model => {
  CompetencyStatuses.init(
    {
      competency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "comptenecy_statuses",
    },
  );
  return new CompetencyStatuses();
};
