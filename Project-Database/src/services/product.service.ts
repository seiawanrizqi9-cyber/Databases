import { update } from "../controllers/product.controller";
import { products } from "../models/product.model";

export const getAllProducts = () => {
  return {
    products,
    total: products.length,
  };
};

export const getProductById = (id: string) => {
  const numId = parseInt(id);

  const product = products.find((p) => p.id === numId);

  if (!products) {
    throw new Error("Product tidak ditemukan");
  }

  return product;
};

export const searchProduct = (
  name?: string,
  max_price?: string,
  min_price?: string
) => {
  let result = products;

  if (name) {
    result = result.filter((p) =>
      p.nama.toLowerCase().includes((name as string).toLowerCase())
    );
  }

  if (max_price) {
    result = result.filter((p) => p.harga <= Number(max_price));
  }

  if (min_price) {
    result = result.filter((p) => p.harga >= Number(min_price));
  }

  return result;
};

export const createProduct = (
  nama: string,
  deskripsi: string,
  harga: number
) => {
  const newProduct = {
    id: products.length + 1,
    nama,
    deskripsi,
    harga,
  };

  products.push(newProduct);

  return products;
};

export const updateProduct = (id: string, data: any) => {
  const numId = parseInt(id);
  const index = products.findIndex((p) => p.id === numId);

  if (index === -1) {
    throw new Error("Product tidak ditemukan");
  }

  products[index] = { ...products[index], ...data };

  return products[index];
};

export const deleteProduct = (id: string) => {
  const numId = parseInt(id);
  const index = products.findIndex((p) => p.id === numId);

  if (index === -1) {
    throw new Error("Product tidak ditemukan");
  }

  const deleted = products.splice(index, 1);

  return deleted;
};
