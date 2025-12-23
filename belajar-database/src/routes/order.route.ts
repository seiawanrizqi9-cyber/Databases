import { Router } from "express";
import {
  createOrderValidation,
  getOrderByIdValidation,
  updateOrderValidation,
  checkoutValidation,
} from "../middleware/order.validation";
import { OrderRepository } from "../repository/order.repository";
import { validate } from "../utils/validation";
import { OrderService } from "../services/order.service";
import { OrderController } from "../controllers/order.controller";
import { authenticate } from "../middleware/auth.validation";
import prismaInstance from "../prisma";

const router = Router();

// Dependency Injection
const repo = new OrderRepository(prismaInstance);
const service = new OrderService(repo, prismaInstance);
const controller = new OrderController(service);

// Routes
router.get("/", authenticate, controller.list);
router.get("/:id", authenticate, validate(getOrderByIdValidation), controller.getById);
router.post("/", authenticate, validate(createOrderValidation), controller.create);
router.post("/checkout", authenticate, validate(checkoutValidation), controller.checkout);
router.put("/:id", authenticate, validate(updateOrderValidation), controller.update);
router.delete("/:id", authenticate, validate(getOrderByIdValidation), controller.delete);

export default router;