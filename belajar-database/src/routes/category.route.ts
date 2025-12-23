import { Router } from "express";
import {
  createCategoryValidation,
  getCategoryByIdValidation,
} from "../middleware/category.validation";
import { CategoryController } from "../controllers/category.controller";
import { validate } from "../utils/validation";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryService } from "../services/category.service";
import { prismaInstance } from "../prisma";

const router = Router();

const repo = new CategoryRepository(prismaInstance);
const service = new CategoryService(repo);
const controller = new CategoryController(service);

router.get("/", controller.list);
router.get("/:id", validate(getCategoryByIdValidation), controller.getById);
router.post("/", validate(createCategoryValidation), controller.create);
router.put("/:id", validate(getCategoryByIdValidation), controller.update);
router.delete("/:id", validate(getCategoryByIdValidation), controller.delete);

export default router;
