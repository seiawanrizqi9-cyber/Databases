import type { Order } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

export const getAllOrders = async (): Promise<{
  orders: Order[];
  total: number;
}> => {
  const orders = await prisma.order.findMany({
    where: { deletedAt: null },
  });
  const total = orders.length;

  return { orders, total };
};

export const getOrderById = async (id: string): Promise<Order> => {
  const numId = parseInt(id);

  const order = await prisma.order.findUnique({
    where: { id: numId, deletedAt: null },
  });

  if (!order) {
    throw new Error("Order tidak ditemukan");
  }

  return order;
};

export const createOrder = async (data: {
  user_id: number;
  total?: number;
}): Promise<Order> => {
  return await prisma.order.create({
    data: {
      user_id: data.user_id,
      total: data.total || 0,
    },
  });
};

export const updateOrder = async (
  id: string,
  data: Partial<Order>
): Promise<Order> => {
  await getOrderById(id); 

  const numId = parseInt(id);

  return await prisma.order.update({
    where: { id: numId, deletedAt: null },
    data,
  });
};

export const deleteOrder = async (id: string): Promise<Order> => {
  const numId = parseInt(id);

  return await prisma.order.update({
    where: { id: numId, deletedAt: null },
    data: { deletedAt: new Date() },
  });
};