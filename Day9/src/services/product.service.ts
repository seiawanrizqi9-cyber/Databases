import type { Product } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

export const getAllProducts = async (): Promise<{products: Product[], total: number}> => {
    const products = await prisma.product.findMany({ include: { category: true } });
    const total = products.length;


  return { products, total };
};

export const getProductById = async (id: string): Promise<Product> => {
  const numId = parseInt(id);

  const product = await prisma.product.findUnique({ where: { id: numId }, include: { category: true } });

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
}): Promise<Product> => {
  return await prisma.product.create({
    data: {
      name: data.nama,
      description: data.deskripsi ?? null,
      price: data.harga,
      stock: data.stock,
      categoryId: data.categoryId ?? null,
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
    where: { id: numId },
    data,
  });
};

export const deleteProduct = async (id: string): Promise<Product> => {
  const numId = parseInt(id);

  return await prisma.product.delete({ where: { id: numId } });
};
