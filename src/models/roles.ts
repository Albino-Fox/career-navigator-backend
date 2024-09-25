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
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "roles",
      indexes: [{ unique: true, fields: ["name"] }],
    },
  );
  return new Roles();
};
