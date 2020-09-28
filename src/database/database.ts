import config from "../config/config";
import * as sequelize from "sequelize";
import { Modelrol } from "../models/role.model";
import { ModelSuscripcion } from "../models/suscripcion.model";
import { Modeluser } from "../models/user.model";
require("dotenv").config();
export const sql = new sequelize.Sequelize(
  process.env.DB || "",
  process.env.USER || "",
  process.env.PASSWORD || "4MewCAqnytH4QFU7TAlX",
  {
    port: 3306,
    host: process.env.HOST || "",
    dialect:"mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const role = Modelrol(sql);
export const suscription = ModelSuscripcion(sql);
export const user = Modeluser(sql);
