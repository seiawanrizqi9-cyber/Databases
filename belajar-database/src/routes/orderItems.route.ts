import { Router } from "express";
import {
  createOrderItemValidation,
  getOrderItemByIdValidation,
  updateOrderItemValidation,
} from "../middleware/orderItems.validation";
import { OrderItemRepository } from "../repository/orderItems.repository";
import { validate } from "../utils/validation";
import { OrderItemService } from "../services/orderItems.service";
import { OrderItemController } from "../controllers/orderItems.controller";
import { authenticate } from "../middleware/auth.validation";
import prismaInstance from "../prisma";

const router = Router();

// Dependency Injection
const repo = new OrderItemRepository(prismaInstance);
const service = new OrderItemService(repo);
const controller = new OrderItemController(service);

// Routes
router.get("/", authenticate, controller.list);
router.get("/stats", authenticate, controller.getStats);
router.get("/:id", authenticate, validate(getOrderItemByIdValidation), controller.getById);
router.post("/", authenticate, validate(createOrderItemValidation), controller.create);
router.put("/:id", authenticate, validate(updateOrderItemValidation), controller.update);
router.delete("/:id", authenticate, validate(getOrderItemByIdValidation), controller.delete);

export default router;