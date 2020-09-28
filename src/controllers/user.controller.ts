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
      .findAll({ include: ["tbl_role", "tbl_subscription"] })
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
    user
      .findAll({ where: { use_email: { [Op.eq]: email } } })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return 0;
      });
  }
}
