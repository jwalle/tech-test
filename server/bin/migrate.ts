import sequelize from "../db";
import "../models/scores";
import "../models/users";

sequelize.sync();
