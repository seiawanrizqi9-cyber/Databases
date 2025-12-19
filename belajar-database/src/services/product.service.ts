import type { Prisma, Product } from "../generated/client";
import * as productRepo from "../repository/product.repository";

interface FindAllParams {
  page: number;
  limit: number;
  search?: {
    name?: string;
    min_price?: number;
    max_price?: number;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface ProductListResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const getAllProducts = async (
  params: FindAllParams
): Promise<ProductListResponse> => {
  const { page, limit, search, sortBy, sortOrder } = params;
  const skip = (page - 1) * limit;

  const whereClause: Prisma.ProductWhereInput = {
    deletedAt: null,
  };

  if (search?.name)
    whereClause.name = {
      contains: search.name,
      mode: "insensitive",
    };

  if (search?.min_price)
    whereClause.price = {
      gte: search.min_price,
    };

  if (search?.max_price)
    whereClause.price = {
      lte: search.max_price,
    };

  const sortCriteria: Prisma.ProductOrderByWithRelationInput = sortBy
    ? {
        [sortBy]: sortOrder || "desc",
      }
    : { createdAt: "desc" };

  const products = await productRepo.list(
    skip,
    limit,
    whereClause,
    sortCriteria
  );

  const total = await productRepo.countAll(whereClause);

  return {
    products,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const getProductById = async (id: string): Promise<Product> => {
  const numId = parseInt(id);

  const product = await productRepo.findById(numId);

  if (!product) {
    throw new Error("Product tidak ditemukan");
  }

  return product;
};

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId?: number;
  image: string;
}): Promise<Product> => {
  return await productRepo.create(data);
};

export const updateProduct = async (
  id: string,
  data: Partial<Product>
): Promise<Product> => {
  await getProductById(id);

  const numId = parseInt(id);

  return await productRepo.update(numId, data);
};

export const deleteProduct = async (id: string): Promise<Product> => {
  const numId = parseInt(id);

  return await productRepo.softDelete(numId);
};
