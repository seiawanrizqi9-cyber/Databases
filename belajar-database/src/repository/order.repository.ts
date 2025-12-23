import type { Prisma, Order, PrismaClient } from "../generated/client";

export interface IOrderRepository {
  create(data: Prisma.OrderCreateInput): Promise<Order>;
  update(id: number, data: Prisma.OrderUpdateInput): Promise<Order>;
  softDelete(id: number): Promise<Order>;
  list(
    skip: number,
    take: number,
    where: Prisma.OrderWhereInput,
    orderBy: Prisma.OrderOrderByWithRelationInput
  ): Promise<Order[]>;
  countAll(where: Prisma.OrderWhereInput): Promise<number>;
  findById(id: number): Promise<Order | null>;
}

export class OrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaClient) {}

  async list(
    skip: number,
    take: number,
    where: Prisma.OrderWhereInput,
    orderBy: Prisma.OrderOrderByWithRelationInput
  ): Promise<Order[]> {
    return await this.prisma.order.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }

  async countAll(where: Prisma.OrderWhereInput): Promise<number> {
    return await this.prisma.order.count({ where });
  }

  async findById(id: number): Promise<Order | null> {
    return await this.prisma.order.findUnique({
      where: { id, deletedAt: null },
      include: {
        user: { select: { username: true, email: true } },
        orderItems: {
          include: {
            product: { select: { name: true, price: true } },
          },
        },
      },
    });
  }

  async create(data: Prisma.OrderCreateInput): Promise<Order> {
    return await this.prisma.order.create({ data });
  }

  async update(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
    return await this.prisma.order.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async softDelete(id: number): Promise<Order> {
    return await this.prisma.order.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}