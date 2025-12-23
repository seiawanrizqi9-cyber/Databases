import { Router } from "express";
import { ProfileRepository } from "../repository/profile.repository";
import { validate } from "../utils/validation";
import { ProfileService } from "../services/profile.service";
import { ProfileController } from "../controllers/profile.controller";
import { authenticate } from "../middleware/auth.validation";
import { upload } from "../middleware/upload.validation";
import {
  createProfileValidation,
  updateProfileValidation,
  getProfileValidation,
  getUserProfileValidation,
} from "../middleware/profile.validation";
import prismaInstance from "../prisma";

const router = Router();

const repo = new ProfileRepository(prismaInstance);
const service = new ProfileService(repo, prismaInstance);
const controller = new ProfileController(service);

router.post(
  "/",
  authenticate,
  upload.single("image"),
  validate(createProfileValidation),
  controller.create
);
router.get("/", controller.list);
router.get("/my-profile", authenticate, controller.getMyProfile);
router.get(
  "/user/:userId",
  validate(getUserProfileValidation),
  controller.getByUserId
);
router.get("/:id", validate(getProfileValidation), controller.getById);
router.put(
  "/:id",
  authenticate,
  validate(updateProfileValidation),
  controller.update
);
router.delete("/:id", authenticate, controller.delete);

// Admin only routes
router.get("/", authenticate, controller.list);

export default router;