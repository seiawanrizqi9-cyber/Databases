import type { Category, Prisma, PrismaClient } from "../generated/client";

export interface ICategoryRepository {
  list(
    skip: number,
    take: number,
    where: Prisma.CategoryWhereInput,
    orderBy: Prisma.CategoryOrderByWithRelationInput
  ): Promise<Category[]>;
  countAll(where: Prisma.CategoryWhereInput): Promise<number>;
  findById(id: number): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category>;
  delete(id: number): Promise<Category>;
}

export class CategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async list(
    skip: number,
    take: number,
    where: Prisma.CategoryWhereInput,
    orderBy: Prisma.CategoryOrderByWithRelationInput
  ): Promise<Category[]> {
    return await this.prisma.category.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async countAll(where: Prisma.CategoryWhereInput): Promise<number> {
    return await this.prisma.category.count({ where });
  }

  async findById(id: number): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: { name },
    });
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return await this.prisma.category.create({ data });
  }

  async update(
    id: number,
    data: Prisma.CategoryUpdateInput
  ): Promise<Category> {
    return await this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Category> {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
