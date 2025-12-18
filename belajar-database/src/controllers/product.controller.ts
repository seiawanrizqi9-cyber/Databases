import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  searchProducts,
  updateProduct,
} from "../services/product.service";

export const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as any;
  const sortBy = req.query.sortBy as string;
  const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";

  const result = await getAllProducts({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  });

  const pagination = {
    page: result.currentPage,
    limit,
    total: result.total,
    totalPages: result.totalPages,
  };

  successResponse(res, "Produk berhasil diambil", result.products, pagination);
};

export const getById = async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new Error("Paramnya gk ada wok");
  }

  const product = await getProductById(req.params.id);

  successResponse(res, "Produk berhasil diambil", product);
};

export const search = async (req: Request, res: Response) => {
  const { name, max_price, min_price } = req.query;

  const result = await searchProducts(
    name?.toString(),
    Number(max_price),
    Number(min_price)
  );

  successResponse(res, "Produk berhasil diambil", result);
};

export const create = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) throw new Error("image not found");

  const { nama, deskripsi, harga, stock } = req.body;

  const imageUrl = `/public/uploads/${file.filename}`;

  const data = {
    nama: nama.toString(),
    ...(deskripsi && { deskripsi: deskripsi }),
    harga: Number(harga),
    categoryId: Number(req.body.categoryId),
    stock: Number(stock),
    image: imageUrl,
  };

  const products = await createProduct(data);

  successResponse(res, "Produk berhasil ditambahkan", products, null, 201);
};

export const update = async (req: Request, res: Response) => {
  const product = await updateProduct(req.params.id!, req.body);

  successResponse(res, "Produk berhasil diupdate", product);
};

export const remove = async (req: Request, res: Response) => {
  const deleted = await deleteProduct(req.params.id!);

  successResponse(res, "Produk berhasil dihapus", deleted);
};
