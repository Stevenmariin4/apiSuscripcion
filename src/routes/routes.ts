import { Router } from "express";
import { CrudRole } from "../controllers/role.controller";
import { CrudSuscription } from "../controllers/subscription.controller";
const router: Router = Router();

// Ruta Roles
router.post("/create/role", CrudRole.create);
router.get("/reader/role", CrudRole.findAll);
router.get("/reader/role/:id", CrudRole.findByid);
router.post("/update/role/:id", CrudRole.update);
router.delete("/delete/role/:id", CrudRole.delete);

// Rutas suscription
router.post("/create/suscription", CrudSuscription.create);
router.get("/reader/suscription", CrudSuscription.findAll);
router.get("/reader/suscription/:id", CrudSuscription.findByid);
router.post("/update/suscription/:id", CrudSuscription.update);
router.delete("/delete/suscription/:id", CrudSuscription.delete);
export default router;
