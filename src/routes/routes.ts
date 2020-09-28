import { Router } from "express";
import { CrudRole } from "../controllers/role.controller";
import { CrudSuscription } from "../controllers/subscription.controller";
import { CrudUser } from "../controllers/user.controller";
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

// Rutas usuarios
router.post("/create/usuario", CrudUser.create);
router.get("/reader/usuario", CrudUser.findAll);
router.get("/reader/usuario/:id", CrudUser.findByid);
router.post("/update/usuario/:id", CrudUser.update);
router.delete("/delete/usuario/:id", CrudUser.delete);
export default router;
