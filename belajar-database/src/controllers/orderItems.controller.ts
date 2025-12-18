import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import {
  createOrderItem,
  deleteOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
} from "../services/orderItems.service";

export const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as any;
  const sortBy = req.query.sortBy as string;
  const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";

  const result = await getAllOrderItems({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  });

  const pagination = {
    page: result.currentPage,
    limit,
    total: result.total,
    totalPages: result.totalPages,
  };

  successResponse(
    res,
    "Order items berhasil diambil",
    result.orderItems,
    pagination
  );
};

export const getById = async (req: Request, res: Response) => {
  const orderItem = await getOrderItemById(req.params.id!);

  successResponse(res, "Order item berhasil diambil", orderItem);
};

export const create = async (req: Request, res: Response) => {
  const { order_id, product_id, quantity } = req.body;
  const data = {
    order_id: Number(order_id),
    product_id: Number(product_id),
    quantity: Number(quantity),
  };

  const orderItem = await createOrderItem(data);

  successResponse(res, "Order item berhasil dibuat", orderItem, null, 201);
};

export const update = async (req: Request, res: Response) => {
  const orderItem = await updateOrderItem(req.params.id!, req.body);

  successResponse(res, "Order item berhasil diupdate", orderItem);
};

export const remove = async (req: Request, res: Response) => {
  const deleted = await deleteOrderItem(req.params.id!);

  successResponse(res, "Order item berhasil dihapus", deleted);
};
