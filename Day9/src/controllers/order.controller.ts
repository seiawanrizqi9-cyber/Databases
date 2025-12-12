import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../services/order.service";

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