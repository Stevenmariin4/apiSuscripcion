import { role, sql } from "../database/database";
import { Request, Response } from "express";
export function create(req: Request, res: Response) {
  if (!req.body.ro_name) {
    res.status(400).send({
      message: "Invalida Data",
    });
    return;
  }
  const Bodyrole = {
    ro_name: req.body.ro_name,
    ro_description: req.body.ro_description,
  };
  role
    .create(Bodyrole)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the role.",
      });
    });
}
