import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import {
  createOrderValidation,
  getOrderByIdValidation,
  updateOrderValidation,
  checkoutValidation,
} from "../middleware/order.validation";
import { validate } from "../utils/validation";
import { authenticate } from "../middleware/auth.validation";

const router = Router();

router.get("/", authenticate, orderController.getAll);
router.get(
  "/:id",
  authenticate,
  validate(getOrderByIdValidation),
  orderController.getById
);
router.post(
  "/",
  authenticate,
  validate(createOrderValidation),
  orderController.create
);
router.post(
  "/checkout",
  authenticate,
  validate(checkoutValidation),
  orderController.checkout
);
router.put(
  "/:id",
  authenticate,
  validate(updateOrderValidation),
  orderController.update
);
router.delete(
  "/:id",
  authenticate,
  validate(getOrderByIdValidation),
  orderController.remove
);

export default router;
