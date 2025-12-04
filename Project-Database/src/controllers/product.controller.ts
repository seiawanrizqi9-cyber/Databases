import type { Request, Response } from "express";
import { products } from "../models/product.model";
import { errorResponse, successResponse } from "../utils/response";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  searchProduct,
  updateProduct,
} from "../services/product.service";

export const getAll = (_req: Request, res: Response) => {
  const { products, total } = getAllProducts();

  successResponse(res, "Produk berhasil ditemukan!", {
    jumlah: total,
    data: products,
  });

  res.json({
    success: true,
    jumlah: products.length,
    data: products,
  });
};

export const getById = (req: Request, res: Response) => {
  if (!req.params.id) {
    return errorResponse(res, "Parameter id wajib diisi!");
  }

  const products = getProductById(req.params.id);

  successResponse(res, "Produk berhasil ditemukan!", products);
};

export const search = (req: Request, res: Response) => {
  const { name, max_price, min_price } = req.query;

  const result = searchProduct(
    name?.toString(),
    max_price?.toString(),
    min_price?.toString()
  );

  res.json({
    success: true,
    filtered_result: result,
  });
};

export const create = (req: Request, res: Response) => {
  const { nama, deskripsi, harga } = req.body;

  const products = createProduct(nama, deskripsi, harga);

  successResponse(res, "Produk berhasil ditambahkan!", products, null, 201);
};

export const update = (req: Request, res: Response) => {
  const product = updateProduct(req.params.id!, req.body);

  successResponse(res, "Produk berhasil diupdate!", product);
};

export const remove = (req: Request, res: Response) => {
  const deleted = deleteProduct(req.params.id!);

  successResponse(res, "Produk berhasil dihapus!", deleted);
};
