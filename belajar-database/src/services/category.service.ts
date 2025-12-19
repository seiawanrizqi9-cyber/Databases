import type { Category, Prisma } from "../generated/client";
import * as categoryRepo from "../repository/category.repository";

interface FindAllParams {
  page: number;
  limit: number;
  search?: {
    name?: string;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface CategoryListResponse {
  categories: Category[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const getAllCategories = async (
  params: FindAllParams
): Promise<CategoryListResponse> => {
  const { page, limit, search, sortBy, sortOrder } = params;
  const skip = (page - 1) * limit;

  const whereClause: Prisma.CategoryWhereInput = {};

  if (search?.name) {
    whereClause.name = {
      contains: search.name,
      mode: "insensitive",
    };
  }

  const sortCriteria: Prisma.CategoryOrderByWithRelationInput = sortBy
    ? {
        [sortBy]: sortOrder || "desc",
      }
    : { createdAt: "desc" };

  const categories = await categoryRepo.list(
    skip,
    limit,
    whereClause,
    sortCriteria
  );

  const total = await categoryRepo.countAll(whereClause);

  return {
    categories,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  const numId = parseInt(id);
  return await categoryRepo.findById(numId);
};

export const createCategory = async (name: string): Promise<Category> => {
  const isExist = await categoryRepo.findByName(name);
  if (isExist) throw new Error("Nama kategori sudah ada");

  return await categoryRepo.create({ name });
};

export const updateCategory = async (
  id: string,
  name: string
): Promise<Category> => {
  const numId = parseInt(id);
  return await categoryRepo.update(numId, { name });
};

export const deleteCategory = async (id: string): Promise<Category> => {
  const numId = parseInt(id);
  return await categoryRepo.remove(numId);
};