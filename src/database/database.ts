import config from "../config/config";
import * as sequelize from "sequelize";
import { Modelrol } from "../models/role.model";
export const sql = new sequelize.Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    port: 3306,
    host: config.HOST,
    dialect: "mysql",
    pool: config.pool,
  }
);

export const role = Modelrol(sql);
