import type { OrderItem } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

interface OrderItemsParams {
  page: number;
  limit: number;
  search?: {
    order_id?: number;
    product_id?: number;
    min_quantity?: number;
    max_quantity?: number;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface OrderItemListResponse {
  orderItems: any[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const getAllOrderItems = async (
  params: OrderItemsParams
): Promise<OrderItemListResponse> => {
  const { page, limit, search, sortBy, sortOrder } = params;
  const skip = (page - 1) * limit;

  const whereClause: any = {};

  if (search?.order_id) {
    whereClause.order_id = search.order_id;
  }

  if (search?.product_id) {
    whereClause.product_id = search.product_id;
  }

  if (search?.min_quantity || search?.max_quantity) {
    whereClause.quantity = {};
    
    if (search?.min_quantity) {
      whereClause.quantity.gte = search.min_quantity;
    }
    
    if (search?.max_quantity) {
      whereClause.quantity.lte = search.max_quantity;
    }
  }

  const orderItems = await prisma.orderItem.findMany({
    skip: skip,
    take: limit,
    where: whereClause,
    include: {
      order: {
        select: {
          id: true,
          total: true,
          user: {
            select: {
              username: true,
              email: true
            }
          }
        }
      },
      product: {
        select: {
          name: true,
          price: true,
          image: true
        }
      }
    },
    orderBy: sortBy
      ? {
          [sortBy]: sortOrder || "desc",
        }
      : { createdAt: "desc" },
  });

  const total = await prisma.orderItem.count({ where: whereClause });

  return {
    orderItems,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const getOrderItemById = async (id: string): Promise<OrderItem> => {
  const numId = parseInt(id);

  const orderItem = await prisma.orderItem.findUnique({
    where: { id: numId, deletedAt: null },
    include: { product: true, order: true },
  });

  if (!orderItem) {
    throw new Error("Order item tidak ditemukan");
  }

  return orderItem;
};

export const createOrderItem = async (data: {
  order_id: number;
  product_id: number;
  quantity: number;
}): Promise<OrderItem> => {
  return await prisma.orderItem.create({
    data: {
      order_id: data.order_id,
      product_id: data.product_id,
      quantity: data.quantity,
    },
  });
};

export const updateOrderItem = async (
  id: string,
  data: Partial<OrderItem>
): Promise<OrderItem> => {
  await getOrderItemById(id); // Sama seperti product service

  const numId = parseInt(id);

  return await prisma.orderItem.update({
    where: { id: numId, deletedAt: null },
    data,
  });
};

export const deleteOrderItem = async (id: string): Promise<OrderItem> => {
  const numId = parseInt(id);

  return await prisma.orderItem.update({
    where: { id: numId, deletedAt: null },
    data: { deletedAt: new Date() },
  });
};