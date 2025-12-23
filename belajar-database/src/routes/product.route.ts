import { Router } from "express";
import {
  createProductValidation,
  getProductByIdValidation,
} from "../middleware/product.validation";
import { ProductRepository } from "../repository/product.repository";
import { validate } from "../utils/validation";
import { ProductService } from "../services/product.service";
import { ProductController } from "../controllers/product.controller";
import { authenticate } from "../middleware/auth.validation";
import { upload } from "../middleware/upload.validation";
import prismaInstance from "../prisma";

const router = Router();

const repo = new ProductRepository(prismaInstance);
const service = new ProductService(repo);
const controller = new ProductController(service);

router.get("/", controller.list);
router.get("/stats", controller.getStats);
router.get("/:id", validate(getProductByIdValidation), controller.getById);
router.post(
  "/",
  authenticate,
  upload.single("image"),
  validate(createProductValidation),
  controller.create
);
router.put(
  "/:id",
  authenticate,
  upload.single("image"),
  validate(createProductValidation),
  controller.update
);
router.delete("/:id", authenticate, controller.delete);

export default router;
