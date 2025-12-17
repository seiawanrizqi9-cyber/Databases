import { Router } from "express";
import * as profileController from "../controllers/profile.controller";
import { validate } from "../utils/validation";
import {
  createProfileValidation,
  updateProfileValidation,
  getProfileValidation,
  getUserProfileValidation,
} from "../middleware/profile.validation";
import { authenticate } from "../middleware/auth.validation";
import { upload } from "../middleware/upload.validation";

const router = Router();

// Protected routes
router.post(
  "/",
  authenticate,
  upload.single("image"),
  validate(createProfileValidation),
  profileController.create
);
router.get("/my-profile", authenticate, profileController.getMyProfile);
router.get(
  "/user/:userId",
  validate(getUserProfileValidation),
  profileController.getByUserId
);
router.get("/:id", validate(getProfileValidation), profileController.getById);
router.put(
  "/:id",
  authenticate,
  validate(updateProfileValidation),
  profileController.update
);
router.delete("/:id", authenticate, profileController.remove);

// Admin only routes
router.get("/", authenticate, profileController.getAll);

export default router;
