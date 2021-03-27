import { Sequelize } from "sequelize";

const sequelize = new Sequelize("smart", "user", "password", {
  host: "database",
  port: 5432,
  dialect: "postgres",
});

export default sequelize;
