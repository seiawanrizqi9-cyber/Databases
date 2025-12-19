// repository/order.repository.ts
import type { Prisma } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

export async function list(
  skip: number,
  take: number,
  where: Prisma.OrderWhereInput,
  orderBy: Prisma.OrderOrderByWithRelationInput
) {
  return await prisma.order.findMany({
    skip,
    take,
    where,
    orderBy,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true
        }
      },
      orderItems: {
        include: {
          product: {
            select: {
              name: true,
              price: true
            }
          }
        }
      }
    },
  });
}

export async function countAll(where: Prisma.OrderWhereInput) {
  return await prisma.order.count({ where });
}

export async function findById(id: number) {
  return await prisma.order.findUnique({
    where: { id, deletedAt: null },
    include: {
      user: { select: { username: true, email: true } },
      orderItems: {
        include: {
          product: { select: { name: true, price: true } },
        },
      },
    },
  });
}

export async function create(data: Prisma.OrderCreateInput) {
  return await prisma.order.create({ data });
}

export async function update(id: number, data: Prisma.OrderUpdateInput) {
  return await prisma.order.update({ 
    where: { id, deletedAt: null }, 
    data 
  });
}

export async function softDelete(id: number) {
  return await prisma.order.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}