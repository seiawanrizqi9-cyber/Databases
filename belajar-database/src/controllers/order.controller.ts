import type { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  checkout as checkoutOrder,
} from "../services/order.service";

export interface orderRequest extends Request {
  user_id: number
  total: number
  orderItems: orderItem[]
}

export interface orderItem {
  product_id: number;
  quantity: number;
}

export const getAll = async (_req: Request, res: Response) => {
  const { orders, total } = await getAllOrders();

  successResponse(res, "Order berhasil diambil", {
    jumlah: total,
    data: orders,
  });
};

export const getById = async (req: Request, res: Response) => {
  const order = await getOrderById(req.params.id!);

  successResponse(res, "Order berhasil diambil", order);
};

export const create = async (req: Request, res: Response) => {
  const { user_id, total } = req.body;
  const data = {
    userId: Number(user_id),
    ...(total && { total: Number(total) }),
  };

  const order = await createOrder(data);

  successResponse(res, "Order berhasil dibuat", order, null, 201);
};

export const update = async (req: Request, res: Response) => {
  const order = await updateOrder(req.params.id!, req.body);

  successResponse(res, "Order berhasil diupdate", order);
};

export const remove = async (req: Request, res: Response) => {
  const deleted = await deleteOrder(req.params.id!);

  successResponse(res, "Order berhasil dihapus", deleted);
};

export const checkout = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;
    
    if (!user_id) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const data = {
      user_id, 
      orderItems: req.body.orderItems
    };

    const result = await checkoutOrder(data);
    successResponse(res, "Checkout berhasil", result, null, 201);
  } catch (error: any) {
    errorResponse(res, error.message || "Terjadi kesalahan", 400);
  }
};