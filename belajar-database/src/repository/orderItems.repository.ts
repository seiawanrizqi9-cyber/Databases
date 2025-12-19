// repository/orderItem.repository.ts
import type { Prisma } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

export async function list(
  skip: number,
  take: number,
  where: Prisma.OrderItemWhereInput,
  orderBy: Prisma.OrderItemOrderByWithRelationInput
) {
  return await prisma.orderItem.findMany({
    skip,
    take,
    where,
    orderBy,
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
  });
}

export async function countAll(where: Prisma.OrderItemWhereInput) {
  return await prisma.orderItem.count({ where });
}

export async function findById(id: number) {
  return await prisma.orderItem.findUnique({
    where: { id, deletedAt: null },
    include: { product: true, order: true },
  });
}

export async function create(data: Prisma.OrderItemCreateInput) {
  return await prisma.orderItem.create({ data });
}

export async function update(id: number, data: Prisma.OrderItemUpdateInput) {
  return await prisma.orderItem.update({
    where: { id, deletedAt: null },
    data
  });
}

export async function softDelete(id: number) {
  return await prisma.orderItem.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}