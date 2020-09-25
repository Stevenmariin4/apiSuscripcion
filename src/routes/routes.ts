import { Router } from "express";
import { create } from "../controllers/role.controller";
const router: Router = Router();

router.post("/create/role", create);
export default router;
