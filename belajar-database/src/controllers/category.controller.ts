import type { Request, Response } from 'express';
import { successResponse } from '../utils/response';
import type { ICategoryService } from '../services/category.service';

export interface ICategoryController {
  list: (req: Request, res: Response) => Promise<void>;
  create: (req: Request, res: Response) => Promise<void>;
  getById: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
}

export class CategoryController implements ICategoryController {
  constructor(private categoryService: ICategoryService) {}

async list (req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search as any;
  const sortBy = req.query.sortBy as string;
  const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";

  const result = await this.categoryService.list({
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

async create (req: Request, res: Response) {
    const category = await this.categoryService.create(req.body.name);

    successResponse(res, "Kategori berhasil ditambahkan", category, null, 201);
}

async getById (req: Request, res: Response) {
    const category = await this.categoryService.getById (req.params.id!);

    successResponse(res, "Kategori berhasil diambil", category, null, 200);
}

async update (req: Request, res: Response) {
    const category = await this.categoryService.update(req.params.id!, req.body.name);

    successResponse(res, "Kategori berhasil diupdate", category, null, 200);
}

async delete (req: Request, res: Response) {
    const category = await this.categoryService.delete(req.params.id!);

    successResponse(res, "Kategori berhasil dihapus", category, null, 200);
}
}