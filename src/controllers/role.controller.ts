import { role, sql } from "../database/database";
import { Request, Response } from "express";
import { IRoleCreated } from "../interfaces/Irole.interfaces";

export class CrudRole {
  static findByid(req: Request, res: Response) {
    if (!req.params.id) {
      res.send(400).send({ message: "No se ha enviado un id para actualizar" });
      return;
    }
    const id = req.params.id;
    role
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

  static findAll(req: Request, res: Response) {
    role
      .findAndCountAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while get the role.",
        });
      });
  }

  static create(req: Request, res: Response) {
    if (!req.body.ro_name) {
      res.status(400).send({
        message: "Invalida Data",
      });
      return;
    }
    const Bodyrole: IRoleCreated = {
      ro_name: req.body.ro_name,
      ro_description: req.body.ro_description,
      is_valid: req.body.is_valid || 1,
    };
    role
      .create(Bodyrole)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the role.",
        });
      });
  }

  static update(req: Request, res: Response) {
    if (!req.params.id) {
      res.send(400).send({ message: "No se ha enviado un id para actualizar" });
      return;
    }
    const id = req.params.id;

    role
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
    role
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
}
