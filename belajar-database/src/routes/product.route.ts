import { Router } from "express";
import {
  getAll,
  getById,
  search,
  create,
  update,
  remove,
} from "../controllers/product.controller";
import {
  createProductValidation,
  getProductByIdValidation,
} from "../middleware/product.validation";
import { validate } from "../utils/validation";
import { authenticate } from "../middleware/auth.validation";
import { upload } from "../middleware/upload.validation";

const router = Router();

router.get("/", getAll);
router.get("/:id", validate(getProductByIdValidation), getById);
router.get("/search", search);
router.post(
  "/",
  authenticate,
  upload.single("image"),
  validate(createProductValidation),
  create
);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
