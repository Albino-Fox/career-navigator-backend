import { Sequelize, DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize) => {
  return sequelize.define('TestSubscribers', {
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
  }, {
    timestamps: false,
    tableName: "test_subscribers",
  });
};