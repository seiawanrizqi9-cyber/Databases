import type { Request, Response } from 'express';
import { createCategory, getAllCategories, getCategoryById, categoryUpdate, removeCategory } from '../services/category.service';
import { successResponse } from '../utils/response';

export const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as any;
  const sortBy = req.query.sortBy as string;
  const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";

  const result = await getAllCategories({
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

  successResponse(res, "Produk berhasil diambil", result.categories, pagination);
};

export const create = async (req: Request, res: Response) => {
    const category = await createCategory(req.body.name);

    successResponse(res, "Kategori berhasil ditambahkan", category, null, 201);
}

export const categoryId = async (req: Request, res: Response) => {
    const category = await getCategoryById(req.params.id!);

    successResponse(res, "Kategori berhasil diambil", category, null, 200);
}

export const update = async (req: Request, res: Response) => {
    const category = await categoryUpdate(req.params.id!, req.body.name);

    successResponse(res, "Kategori berhasil diupdate", category, null, 200);
}

export const remove = async (req: Request, res: Response) => {
    const category = await removeCategory(req.params.id!);

    successResponse(res, "Kategori berhasil dihapus", category, null, 200);
}