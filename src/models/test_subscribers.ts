import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "test_subscribers",
})
class TestSubscribers extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "nickname",
  })
  nickname?: string;

  @Column({
    type: DataType.DATE,
    field: "subscription_time",
  })
  subscription_time?: string;
};

module.exports = TestSubscribers;