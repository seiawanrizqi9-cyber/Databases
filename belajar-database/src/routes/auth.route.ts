import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/password/register", authController.register);  
router.post("/password/login", authController.login);   

export default router;