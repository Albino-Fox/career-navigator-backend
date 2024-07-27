import { Sequelize, DataTypes, Model } from "sequelize";

export class Roles extends Model {
  declare id: number;
  public name!: string;
}

export const initRoles = (sequelize: Sequelize): Model => {
  Roles.init(
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
      tableName: "roles",
    },
  );
  return new Roles();
};
