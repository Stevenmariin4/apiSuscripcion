import { suscription, sql } from "../database/database";
import { Request, Response } from "express";
import { ISuscription } from "../interfaces/Isuscripton.interfaces";

export class CrudSuscription {
  static findByid(req: Request, res: Response) {
    if (!req.params.id) {
      res.send(400).send({ message: "No se ha enviado un id para actualizar" });
      return;
    }
    const id = req.params.id;
    suscription
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
    suscription
      .findAll()
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
    if (!req.body.su_name || !req.body.su_time) {
      res.status(400).send({
        message: "Invalida Data",
      });
      return;
    }
    const Bodysuscription: ISuscription = {
      su_name: req.body.su_name,
      su_description: req.body.su_description,
      su_time: req.body.su_time,
      is_valid: req.body.is_valid,
    };
    suscription
      .create(Bodysuscription)
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

    suscription
      .update(req.body, {
        where: { su_id: id },
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
    suscription
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
