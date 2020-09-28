import { CrudUser } from "./user.controller";
import { login, sql } from "../database/database";
import { Request, Response } from "express";
import { IRoleCreated } from "../interfaces/Irole.interfaces";

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

  static findAll(req: Request, res: Response) {
    login
      .findAll()
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
    if (!req.body.use_email) {
      res.status(400).send({
        message: "Invalida Data",
      });
      return;
    }
    try {
      const usuario = CrudUser.findQuery(req.body.use_email);
      console.log(usuario);
    } catch (err) {}
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
    if (!req.body.use_email) {
      res.send({ message: "No Se Ha Enviado Email" });
    }
    try {
      const usuario = await CrudUser.findQuery(req.body.use_email);
      console.log(usuario);
      res.send(usuario);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  }
}
