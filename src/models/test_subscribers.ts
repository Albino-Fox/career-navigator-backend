import { Sequelize, DataTypes, Model } from 'sequelize';

export class TestSubscribers extends Model {
  public id!: number;
  public username!: string;
  public subscription_date!: Date;
};

export const initTestSubscribers = (sequelize: Sequelize) : Model => {
  TestSubscribers.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      subscription_date: {
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: "test_subscribers",
    }
  );
  return new TestSubscribers();
} 