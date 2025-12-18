import type { Category } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

interface FindAllParams {
  page: number;
  limit: number;
  search?: {
    name?: string;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface categoryListResponse {
  categories: Category[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const getAllCategories = async (
  params: FindAllParams
): Promise<categoryListResponse> => {
  const { page, limit, search, sortBy, sortOrder } = params;
  const skip = (page - 1) * limit;

  const whereClause: any = {
    deletedAt: null,
  };

  if (search?.name)
    whereClause.name = {
      contains: search.name,
      mode: "insensitive",
    };

  const categories = await prisma.category.findMany({
    skip: skip,
    take: limit,
    where: whereClause,
    orderBy: sortBy
      ? {
          [sortBy]: sortOrder || "desc",
        }
      : { createdAt: "desc" },
  });

  const total = await prisma.category.count({ where: whereClause });

  return {
    categories,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const getCategoryById = async (id: string) => {
  const numId = parseInt(id);

  return await prisma.category.findUnique({
    where: { id: numId, deletedAt: null },
  });
};

export const createCategory = async (name: string) => {
  const isExist = await prisma.category.findUnique({ where: { name }  });
  if (isExist) throw new Error("Nama kategori sudah ada");

  return await prisma.category.create({
    data: {
      name,
    },
  });
};

export const categoryUpdate = async (id: string, name: string) => {
  const numId = parseInt(id);

  return await prisma.category.update({
    where: { id: numId, deletedAt: null },
    data: { name },
  });
};

export const removeCategory = async (id: string) => {
  const numId = parseInt(id);

  return await prisma.category.delete({ where: { id: numId, deletedAt: null } });
};