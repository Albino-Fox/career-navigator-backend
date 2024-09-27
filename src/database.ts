import config from "@/config/config.ts";
import { Sequelize } from "sequelize";
import {
  initTestSubscribers,
  TestSubscribers,
} from "@/models/test_subscribers";
import {
  CareerGuidances,
  initCareerGuidances,
} from "@/models/career_guidances";
import { initRoles, Roles } from "@/models/roles";
import { initUsers, Users } from "@/models/users";
import { initVacancies, Vacancies } from "@/models/vacancies";
import {
  CareerGuidanceBranches,
  initCareerGuidanceBranches,
} from "./models/career_guidance_branches";
import { Answers, initAnswers } from "./models/answers";
import { Applications, initApplications } from "./models/applications";
import { initTasks, Tasks } from "./models/tasks";
import { initTaskStatuses, TaskStatuses } from "./models/task_statuses";

class Database {
  public sequelize: Sequelize = new Sequelize({
    database: config.db_name,
    username: config.db_user,
    host: config.db_host,
    password: config.db_password,
    dialect: config.db_dialect,
  });

  public testSubscribers = TestSubscribers;

  public careerGuidances = CareerGuidances;
  public careerGuidanceBranches = CareerGuidanceBranches;

  public answers = Answers;

  public applications = Applications;

  public tasks = Tasks;
  public taskStatuses = TaskStatuses;

  public roles = Roles;

  public users = Users;

  public vacancies = Vacancies;

  constructor() {
    this.connectToDatabase();
    initTestSubscribers(this.sequelize);

    initCareerGuidances(this.sequelize);
    initCareerGuidanceBranches(this.sequelize);

    initAnswers(this.sequelize);

    initApplications(this.sequelize);

    initTasks(this.sequelize);
    initTaskStatuses(this.sequelize);

    initRoles(this.sequelize);

    initUsers(this.sequelize);

    initVacancies(this.sequelize);

    //associations
    // WARNING: Untested

    this.users.hasMany(this.applications, { foreignKey: "user_id" });
    this.applications.belongsTo(this.users, { foreignKey: "user_id" });

    this.vacancies.hasMany(this.applications, { foreignKey: "vacancy_id" });
    this.applications.belongsTo(this.vacancies, { foreignKey: "vacancy_id" });

    this.vacancies.hasOne(this.users, { foreignKey: "focus" });
    this.users.belongsTo(this.vacancies, { foreignKey: "focus" });

    this.users.hasMany(this.vacancies, { foreignKey: "employer_id" });
    this.vacancies.belongsTo(this.users, { foreignKey: "employer_id" });

    this.roles.hasMany(this.users, { foreignKey: "role_id" });
    this.users.belongsTo(this.roles, { foreignKey: "role_id" });

    this.users.hasMany(this.taskStatuses, { foreignKey: "user_id" });
    this.taskStatuses.belongsTo(this.users, { foreignKey: "user_id" });

    this.careerGuidances.hasMany(this.vacancies, {
      foreignKey: "career_guidance_id",
    });
    this.vacancies.belongsTo(this.careerGuidances, {
      foreignKey: "career_guidance_id",
    });

    this.careerGuidances.hasMany(this.careerGuidanceBranches, {
      foreignKey: "career_guidance_id",
    });
    this.careerGuidanceBranches.belongsTo(this.careerGuidances, {
      foreignKey: "career_guidance_id",
    });

    this.users.hasMany(this.careerGuidanceBranches, {
      foreignKey: "university_id",
    });
    this.careerGuidanceBranches.belongsTo(this.users, {
      foreignKey: "university_id",
    });

    this.users.hasMany(this.answers, { foreignKey: "user_id" });
    this.answers.belongsTo(this.users, { foreignKey: "user_id" });

    this.careerGuidanceBranches.hasMany(this.tasks, {
      foreignKey: "career_guidance_branch_id",
    });
    this.tasks.belongsTo(this.careerGuidanceBranches, {
      foreignKey: "career_guidance_branch_id",
    });

    this.tasks.hasMany(this.taskStatuses, { foreignKey: "task_id" });
    this.taskStatuses.belongsTo(this.tasks, { foreignKey: "task_id" });

    this.tasks.hasMany(this.answers, { foreignKey: "task_id" });
    this.answers.belongsTo(this.tasks, { foreignKey: "task_id" });

    this.careerGuidanceBranches.hasMany(this.careerGuidances, {
      foreignKey: "id",
    });
    this.careerGuidances.belongsTo(this.careerGuidanceBranches, {
      foreignKey: "id",
    });
  }

  private async connectToDatabase() {
    await this.sequelize!.authenticate()
      .then(() => {
        console.log("Connection established.");
      })
      .catch((err) => {
        console.error(`Connection failed: ${err}`);
      });
  }
}

const db = new Database();
export default db;
