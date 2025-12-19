import type { Prisma } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

export async function list(
  skip: number,
  take: number,
  where: Prisma.ProfileWhereInput,
  orderBy: Prisma.ProfileOrderByWithRelationInput
) {
  return await prisma.profile.findMany({
    skip,
    take,
    where,
    orderBy,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true
        }
      }
    }
  });
}

export async function countAll(where: Prisma.ProfileWhereInput) {
  return await prisma.profile.count({ where });
}

export async function findById(id: number) {
  return await prisma.profile.findUnique({
    where: { id, deletedAt: null },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true
        }
      }
    }
  });
}

export async function findByUserId(userId: number) {
  return await prisma.profile.findUnique({
    where: { user_id: userId, deletedAt: null },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true
        }
      }
    }
  });
}

export async function create(data: Prisma.ProfileCreateInput) {
  return await prisma.profile.create({ 
    data,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true
        }
      }
    }
  });
}

export async function update(id: number, data: Prisma.ProfileUpdateInput) {
  return await prisma.profile.update({
    where: { id, deletedAt: null },
    data,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true
        }
      }
    }
  });
}

export async function softDelete(id: number) {
  return await prisma.profile.update({
    where: { id },
    data: { deletedAt: new Date() }
  });
}