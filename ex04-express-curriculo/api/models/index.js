import Sequelize from "sequelize";

import getExternalLinkModel from "./ExternalLink";
import getPersonModel from "./Person";
import getResumeModel from "./Resume";
import getEducationModel from "./Education";
import getExperienceModel from "./Experience";
import getSkillModel from "./Skill";

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  // logging: false, // Disable SQL query logging
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialectModule: require("pg"),
});

const models = {
  Person: getPersonModel(sequelize, Sequelize),
  ExternalLink: getExternalLinkModel(sequelize, Sequelize),
  Resume: getResumeModel(sequelize, Sequelize),
  Education: getEducationModel(sequelize, Sequelize),
  Experience: getExperienceModel(sequelize, Sequelize),
  Skill: getSkillModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
