import { Router } from "express";
import * as magicController from "../controllers/magicLogin.controller";
import * as authController from "../controllers/auth.controller";
import { validate } from "../utils/validation";
import {
  requestMagicLinkValidation,
  verifyTokenValidation,
} from "../middleware/magic.validation";

const router = Router();

// 🔐 PASSWORD AUTH
router.post("/password/register", authController.register);  
router.post("/password/login", authController.login);   

// ✨ MAGIC LINK AUTH  
router.post("/magic/request", validate(requestMagicLinkValidation), magicController.requestMagicLink);
router.post("/magic/verify", validate(verifyTokenValidation), magicController.verifyMagicToken);
router.get("/magic/validate", magicController.validateSession);
router.get("/magic/user/:email", magicController.getUserProfile);

export default router;