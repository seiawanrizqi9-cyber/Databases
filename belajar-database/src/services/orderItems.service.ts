import type { OrderItem, Prisma } from "../generated/client";
import * as orderItemsRepo from "../repository/orderItems.repository";

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
  orderItems: OrderItem[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const getAllOrderItems = async (
  params: OrderItemsParams
): Promise<OrderItemListResponse> => {
  const { page, limit, search, sortBy, sortOrder } = params;
  const skip = (page - 1) * limit;

  const whereClause: Prisma.OrderItemWhereInput = {};

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

  const sortCriteria: Prisma.OrderItemOrderByWithRelationInput = sortBy
    ? {
        [sortBy]: sortOrder || "desc",
      }
    : { createdAt: "desc" };

  const orderItems = await orderItemsRepo.list(
    skip,
    limit,
    whereClause,
    sortCriteria
  );

  const total = await orderItemsRepo.countAll(whereClause);

  return {
    orderItems,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const getOrderItemById = async (id: string): Promise<OrderItem> => {
  const numId = parseInt(id);

  const orderItem = await orderItemsRepo.findById(numId);

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
  const createData: Prisma.OrderItemCreateInput = {
    order: { connect: { id: data.order_id } },  
    product: { connect: { id: data.product_id } }, 
    quantity: data.quantity,
  };

  return await orderItemsRepo.create(createData);
};

export const updateOrderItem = async (
  id: string,
  data: Partial<OrderItem>
): Promise<OrderItem> => {
  await getOrderItemById(id);

  const numId = parseInt(id);

  return await orderItemsRepo.update(numId, data);
};

export const deleteOrderItem = async (id: string): Promise<OrderItem> => {
  const numId = parseInt(id);

  return await orderItemsRepo.softDelete(numId);
};