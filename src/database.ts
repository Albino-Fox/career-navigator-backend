import config from "./config/config.ts";
import { Sequelize } from "sequelize";
import {
  initTestSubscribers,
  TestSubscribers,
} from "./models/test_subscribers";
import {
  CareerGuidances,
  initCareerGuidances,
} from "./models/career_guidances";
import {
  CareerGuidanceQuestions,
  initCareerGuidanceQuestions,
} from "./models/career_guidance_questions";
import { Comptenecies, initCompetencies } from "./models/competencies";
import {
  CompetencyStatuses,
  initCompetencyStatuses,
} from "./models/competency_statuses";
import { ExamStatuses, initExamStatuses } from "./models/exam_statuses";
import { ExamTasks, initExamTasks } from "./models/exam_tasks";
import { Exams, initExams } from "./models/exams";
import { initRoles, Roles } from "./models/roles";
import { initUniversities, Universities } from "./models/unversities";
import { initUsers, Users } from "./models/users";
import { initVacancies, Vacancies } from "./models/vacancies";

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
  public careerGuidanceQuestions = CareerGuidanceQuestions;

  public competencies = Comptenecies;
  public competencyStatuses = CompetencyStatuses;

  public examStatuses = ExamStatuses;
  public examTasks = ExamTasks;
  public exams = Exams;

  public roles = Roles;

  public universities = Universities;
  public users = Users;

  public vacancies = Vacancies;

  constructor() {
    this.connectToDatabase();
    initTestSubscribers(this.sequelize);

    initCareerGuidances(this.sequelize);
    initCareerGuidanceQuestions(this.sequelize);

    initCompetencies(this.sequelize);
    initCompetencyStatuses(this.sequelize);

    initExamStatuses(this.sequelize);
    initExamTasks(this.sequelize);
    initExams(this.sequelize);

    initRoles(this.sequelize);

    initUniversities(this.sequelize);
    initUsers(this.sequelize);

    initVacancies(this.sequelize);

    //associations
    // WARNING: Untested
    this.roles.hasMany(this.users, { foreignKey: "role_id" });
    this.users.hasOne(this.roles, { foreignKey: "id" });

    this.competencyStatuses.hasOne(this.users, { foreignKey: "id" });
    this.users.hasMany(this.competencyStatuses, { foreignKey: "user_id" });

    this.vacancies.hasOne(this.users, { foreignKey: "id" });
    this.users.hasMany(this.vacancies, { foreignKey: "employer_id" });

    this.careerGuidances.hasMany(this.users, {
      foreignKey: "career_guidance_id",
    });
    this.users.hasMany(this.careerGuidances, { foreignKey: "id" });

    this.examStatuses.hasOne(this.users, { foreignKey: "id" });
    this.users.hasMany(this.examStatuses, { foreignKey: "user_id" });

    // TODO: Rework this relationship?
    this.universities.hasMany(this.careerGuidances, { foreignKey: "id" });
    this.careerGuidances.hasMany(this.universities, {
      foreignKey: "career_guidance_id",
    });

    this.careerGuidances.hasOne(this.vacancies, {
      foreignKey: "career_guidance_id",
    });
    this.vacancies.hasOne(this.careerGuidances, { foreignKey: "id" });

    this.universities.hasMany(this.exams, { foreignKey: "id" });
    this.exams.hasOne(this.universities, { foreignKey: "id" });

    this.examStatuses.hasOne(this.users, { foreignKey: "id" });
    this.users.hasMany(this.examStatuses, { foreignKey: "user_id" });

    this.examStatuses.hasMany(this.exams, { foreignKey: "id" });
    this.exams.hasOne(this.examStatuses, { foreignKey: "exam_id" });

    this.exams.hasMany(this.examTasks, { foreignKey: "exam_id" });
    this.examTasks.hasOne(this.exams, { foreignKey: "id" });

    this.exams.hasMany(this.vacancies, { foreignKey: "exam_id" });
    this.vacancies.hasOne(this.exams, { foreignKey: "id" });

    this.competencies.hasOne(this.careerGuidances, {
      foreignKey: "id",
    });
    this.careerGuidances.hasMany(this.competencies, {
      foreignKey: "career_guidance_id",
    });

    this.competencies.hasOne(this.competencyStatuses, {
      foreignKey: "competency_id",
    });
    this.competencyStatuses.hasMany(this.competencies, { foreignKey: "id" });
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
