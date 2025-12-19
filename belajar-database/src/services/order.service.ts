import type { Prisma, Order } from "../generated/client";
import { getPrisma } from "../prisma";
import * as orderRepo from "../repository/order.repository";

const prisma = getPrisma();

interface FindAllParams {
  page: number;
  limit: number;
  search?: {
    min_total?: number;  
    max_total?: number; 
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  userId?: number | undefined;
}

interface OrderListResponse {
  orders: Order[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const getAllOrders = async (
  params: FindAllParams
): Promise<OrderListResponse> => {
  const { page, limit, search, sortBy, sortOrder, userId } = params;
  const skip = (page - 1) * limit;

  const whereClause: Prisma.OrderWhereInput = {
    deletedAt: null,
  };

  if (userId) {
    whereClause.user_id = userId;
  }

  if (search?.min_total || search?.max_total) {
    whereClause.total = {};
    
    if (search?.min_total) {
      whereClause.total.gte = search.min_total;
    }
    
    if (search?.max_total) {
      whereClause.total.lte = search.max_total;
    }
  }

  const sortCriteria: Prisma.OrderOrderByWithRelationInput = sortBy
    ? {
        [sortBy]: sortOrder || "desc",
      }
    : { createdAt: "desc" };

  const orders = await orderRepo.list(
    skip,
    limit,
    whereClause,
    sortCriteria
  );

  const total = await orderRepo.countAll(whereClause);

  return {
    orders,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const getOrderById = async (id: string) => {
  const numId = parseInt(id);

  const order = await orderRepo.findById(numId);

  if (!order) throw new Error("Order tidak ditemukan");

  return {
    id: order.id,
    customer: (order as any).user?.name || "Unknown",
    email: (order as any).user?.email || "",
    total: order.total,
    tanggal: order.createdAt,
    items: (order as any).orderItems.map((item: any) => ({
      produk: item.product?.name || "Unknown",
      harga_satuan: item.product?.price || 0,
      jumlah: item.quantity,
    })),
  };
};

export const createOrder = async (data: {
  user_id: number;
  total?: number;
}): Promise<Order> => {
  return await orderRepo.create({
    user_id: data.user_id,
    total: data.total || 0,
  });
};

export const updateOrder = async (
  id: string,
  data: Partial<Order>
): Promise<Order> => {
  await getOrderById(id);

  const numId = parseInt(id);

  return await orderRepo.update(numId, data);
};

export const checkout = async (data: {
  orderItems: Array<{ product_id: number; quantity: number }>;
  user_id: number; 
}) => {
  if (!data.user_id) {
    throw new Error("User ID diperlukan");
  }

  let total = 0;
  const orderItemsData = [];

  for (const item of data.orderItems) {
    const product = await prisma.product.findUnique({
      where: { id: item.product_id },
    });

    if (!product)
      throw new Error(`Produk ID ${item.product_id} tidak ditemukan`);
    if (product.stock < item.quantity) {
      throw new Error(
        `Stok "${product.name}" tidak cukup. Tersedia: ${product.stock}`
      );
    }

    total += Number(product.price) * item.quantity;
    orderItemsData.push({
      product_id: item.product_id,
      quantity: item.quantity,
      product_name: product.name,
      product_price: Number(product.price),
      subtotal: Number(product.price) * item.quantity,
    });
  }

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        user_id: data.user_id,
        total,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    const orderItems = [];
    for (const item of data.orderItems) {
      const orderItem = await tx.orderItem.create({
        data: {
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
        },
        include: {
          product: {
            select: { id: true, name: true, price: true },
          },
        },
      });

      await tx.product.update({
        where: { id: item.product_id },
        data: { stock: { decrement: item.quantity } },
      });

      orderItems.push(orderItem);
    }

    return {
      order_id: order.id,
      user: order.user,
      total: order.total,
      items: orderItems.map((item) => ({
        product_id: item.product_id,
        product_name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: Number(item.product.price) * item.quantity,
      })),
      total_items: orderItems.length,
      created_at: order.createdAt,
    };
  });
};

export const deleteOrder = async (id: string): Promise<Order> => {
  const numId = parseInt(id);

  return await orderRepo.softDelete(numId);
};