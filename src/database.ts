import config from "@/config.ts";
import { Sequelize } from "sequelize";
import {
  initTestSubscribers,
  TestSubscribers,
} from "./models/test_subscribers";
import { CareerGuidance, initCareerGuidance } from "./models/career_guidance";
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

  public careerGuidance = CareerGuidance;
  public careerGuidanceQuestions = CareerGuidanceQuestions;

  public competencies = Comptenecies;
  public competencyStatuses = CompetencyStatuses;

  public examStatuses = ExamStatuses;
  public examTasks = ExamTasks;

  public roles = Roles;

  public universities = Universities;
  public users = Users;

  public vacancies = Vacancies;

  constructor() {
    this.connectToDatabase();
    initTestSubscribers(this.sequelize);

    initCareerGuidance(this.sequelize);
    initCareerGuidanceQuestions(this.sequelize);

    initCompetencies(this.sequelize);
    initCompetencyStatuses(this.sequelize);

    initExamStatuses(this.sequelize);
    initExamTasks(this.sequelize);

    initRoles(this.sequelize);

    initUniversities(this.sequelize);
    initUsers(this.sequelize);

    initVacancies(this.sequelize);
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
