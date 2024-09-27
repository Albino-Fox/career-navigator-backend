import { Sequelize, DataTypes, Model } from "sequelize";

export class StudentSkills extends Model {
  declare id: number;
  public name!: string;
}

export const initStudentSkills = (sequelize: Sequelize): Model => {
  StudentSkills.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      career_guidance_branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "student_skills",
      indexes: [
        {
          unique: true,
          fields: ["user_id", "career_guidance_branch_id"],
        },
      ],
    },
  );
  return new StudentSkills();
};
