import { user, sql } from "../database/database";
import { Request, Response } from "express";
import { Op } from "sequelize";

export class CrudUser {
  static findByid(req: Request, res: Response) {
    if (!req.params.id) {
      res.send(400).send({ message: "No se ha enviado un id para actualizar" });
      return;
    }
    const id = req.params.id;
    user
      .findByPk(id, { include: ["tbl_role", "tbl_subscription"] })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Internal Server Error",
        });
      });
  }

  static findAll(req: Request, res: Response) {
    user
      .findAndCountAll({
        include: ["tbl_role", "tbl_subscription"],
        order: ["use_id"],
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while get the suscription.",
        });
      });
  }

  static create(req: Request, res: Response) {
    if (
      !req.body.use_name ||
      !req.body.use_email ||
      !req.body.ro_id ||
      !req.body.su_id
    ) {
      res.status(400).send({
        message: "Invalida Data",
      });
      return;
    }
    const x = CrudUser.findQuery(req.body.use_email)
      .then((data) => {
        console.log(data.rows.length);
        if (data.rows.length > 0) {
          res.send({ message: "El Usuario Ya se encuentra Registrado" });
        } else {
          user
            .create(req.body)
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while creating the suscription.",
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Internal Server Error",
        });
      });
  }

  static update(req: Request, res: Response) {
    if (!req.params.id) {
      res.send(400).send({ message: "No se ha enviado un id para actualizar" });
      return;
    }
    const id = req.params.id;

    user
      .update(req.body, {
        where: { use_id: id },
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
      is_valid: 0,
    };
    const id = req.params.id;
    user
      .update(body, {
        where: { use_id: id },
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

  static findQuery(email: any) {
    return user.findAndCountAll({
      where: { use_email: { [Op.eq]: email }, is_valid: true },
    });
  }
}
