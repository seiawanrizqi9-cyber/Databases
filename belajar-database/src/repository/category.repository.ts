// repository/category.repository.ts
import type { Prisma } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

export async function list(
  skip: number,
  take: number,
  where: Prisma.CategoryWhereInput,
  orderBy: Prisma.CategoryOrderByWithRelationInput
) {
  return await prisma.category.findMany({
    skip,
    take,
    where,
    orderBy,
  });
}

export async function countAll(where: Prisma.CategoryWhereInput) {
  return await prisma.category.count({ where });
}

export async function findById(id: number) {
  return await prisma.category.findUnique({
    where: { id },
  });
}

export async function findByName(name: string) {
  return await prisma.category.findUnique({
    where: { name },
  });
}

export async function create(data: Prisma.CategoryCreateInput) {
  return await prisma.category.create({ data });
}

export async function update(id: number, data: Prisma.CategoryUpdateInput) {
  return await prisma.category.update({
    where: { id },
    data,
  });
}

export async function remove(id: number) {
  return await prisma.category.delete({
    where: { id },
  });
}