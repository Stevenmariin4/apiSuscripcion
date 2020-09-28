import { CrudUser } from "./user.controller";
import { login, sql } from "../database/database";
import { Request, Response } from "express";
import { IRoleCreated } from "../interfaces/Irole.interfaces";
import { Op } from "sequelize";

export class CrudLogin {
  static findByid(req: Request, res: Response) {
    if (!req.params.id) {
      res.send(400).send({ message: "No se ha enviado un id para actualizar" });
      return;
    }
    const id = req.params.id;
    login
      .findByPk(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Internal Server Error",
        });
      });
  }

  static findAll(id: any) {
    return login.findAll({
      where: { use_id: { [Op.eq]: id }, is_valid: true },
    });
  }

  static create(req: Request, res: Response) {
    if (!req.body.use_email || req.body.use_password) {
      res.status(400).send({
        message: "Invalida Data",
      });
      return;
    }
    try {
      CrudUser.findQuery(req.body.use_email)
        .then((data) => {
          console.log();
          if (data.rows.length == 0) {
            res.send({ message: "Usuario No Encontrado" });
            return;
          }
          login
            .create(req.body)
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the role.",
              });
            });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Internal Server Error",
          });
        });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  }

  static update(req: Request, res: Response) {
    if (!req.params.id) {
      res.send(400).send({ message: "No se ha enviado un id para actualizar" });
      return;
    }
    const id = req.params.id;

    login
      .update(req.body, {
        where: { ro_id: id },
      })
      .then((data) => {
        res.send({ message: "Rol Actualizado Correctamente" });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Internal Server Error",
        });
      });
  }

  static delete(req: Request, res: Response) {
    if (!req.params.id) {
      res.send(400).send({ message: "No se ha enviado un id para actualizar" });
      return;
    }
    const body = {
      ro_is_valid: 0,
    };
    const id = req.params.id;
    login
      .update(body, {
        where: { ro_id: id },
      })
      .then((data) => {
        res.send({ message: "Rol Eliminado Correctamente" });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Internal Server Error",
        });
      });
  }

  static async searchUser(req: Request, res: Response) {
    if (!req.body.use_email || !req.body.use_password) {
      res.send({ message: "Usuario o Clave Incorrecta" });
    }
    try {
      CrudUser.findQuery(req.body.use_email)
        .then((data: any) => {
          if (data.rows.length == 0) {
            res.send({ message: "Usuario o Clave Incorrecta" });
            return;
          }
          const id = data.rows[0].use_id;
          CrudLogin.findAll(id)
            .then((data) => {
              console.log(data.length);
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "Internal Server Error",
              });
            });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Internal Server Error",
          });
        });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  }
}
