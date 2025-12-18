import type { Product } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

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

  const whereClause: any = {
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

  const products = await prisma.product.findMany({
    skip: skip,
    take: limit,
    where: whereClause,
    include: { category: true },
    orderBy: sortBy
      ? {
          [sortBy]: sortOrder || "desc",
        }
      : { createdAt: "desc" },
  });

  const total = await prisma.product.count({ where: whereClause });

  return {
    products,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const getProductById = async (id: string): Promise<Product> => {
  const numId = parseInt(id);

  const product = await prisma.product.findUnique({
    where: { id: numId, deletedAt: null },
    include: { category: true },
  });

  if (!product) {
    throw new Error("Product tidak ditemukan");
  }

  return product;
};

export const searchProducts = async (
  name?: string,
  min_price?: number,
  max_price?: number
): Promise<Product[]> => {
  return await prisma.product.findMany({
    where: {
      ...(name && {
        name: {
          contains: name,
          mode: "insensitive",
        },
      }),
      price: {
        ...(min_price && { gte: min_price }),
        ...(max_price && { lte: max_price }),
      },
      deletedAt: null,
    },
    include: { category: true },
  });
};

export const createProduct = async (data: {
  nama: string;
  deskripsi?: string;
  harga: number;
  stock: number;
  categoryId?: number;
  image: string;
}): Promise<Product> => {
  return await prisma.product.create({
    data: {
      name: data.nama,
      description: data.deskripsi ?? null,
      price: data.harga,
      stock: data.stock,
      categoryId: data.categoryId ?? null,
      image: data.image,
    },
  });
};

export const updateProduct = async (
  id: string,
  data: Partial<Product>
): Promise<Product> => {
  await getProductById(id);

  const numId = parseInt(id);

  return await prisma.product.update({
    where: { id: numId, deletedAt: null },
    data,
  });
};

export const deleteProduct = async (id: string): Promise<Product> => {
  const numId = parseInt(id);

  return await prisma.product.update({
    where: { id: numId, deletedAt: null },
    data: { deletedAt: new Date() },
  });
};
