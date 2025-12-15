import type { Order, OrderItem } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

export interface createOrder {
  user_id: number;
  total: number;
  orderItems: OrderItem[];
}

export interface orderItem {
  product_id: number;
  quantity: number;
}

export const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    where: { deletedAt: null },
    include: {
      user: { select: { name: true } },
      orderItems: {
        include: {
          product: { select: { name: true } }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const formattedOrders = orders.map(order => ({
    id: order.id,
    nama_customer: (order as any).user?.name || 'Unknown',
    produk_dibeli: (order as any).orderItems
      .map((item: any) => item.product?.name)
      .filter(Boolean)
      .join(', '),
    total_harga: order.total,
    tanggal: order.createdAt
  }));

  return { 
    orders: formattedOrders, 
    total: orders.length 
  };
};

export const getOrderById = async (id: string) => {
  const numId = parseInt(id);

  const order = await prisma.order.findUnique({
    where: { id: numId, deletedAt: null },
    include: {
      user: { select: { name: true, email: true } },
      orderItems: {
        include: {
          product: { select: { name: true, price: true } }
        }
      }
    }
  });

  if (!order) throw new Error("Order tidak ditemukan");

  return {
    id: order.id,
    customer: (order as any).user?.name || 'Unknown',
    email: (order as any).user?.email || '',
    total: order.total,
    tanggal: order.createdAt,
    items: (order as any).orderItems.map((item: any) => ({
      produk: item.product?.name || 'Unknown',
      harga_satuan: item.product?.price || 0,
      jumlah: item.quantity
    }))
  };
};

export const createOrder = async (data: {
  user_id: number;
  total?: number;
}): Promise<Order> => {
  return await prisma.order.create({
    data: {
      user_id: data.user_id,
      total: data.total || 0,
    },
  });
};

export const updateOrder = async (
  id: string,
  data: Partial<Order>
): Promise<Order> => {
  await getOrderById(id);

  const numId = parseInt(id);

  return await prisma.order.update({
    where: { id: numId, deletedAt: null },
    data,
  });
};

export const checkout = async (data: createOrder) => {
  if (!data.orderItems?.length) {
    throw new Error("Order tidak boleh kosong");
  }
  
  let total = 0;
  const orderItemsData = [];

  for (const item of data.orderItems) {
    const product = await prisma.product.findUnique({
      where: { id: item.product_id },
    });
    
    if (!product) throw new Error(`Produk ID ${item.product_id} tidak ditemukan`);
    if (product.stock < item.quantity) {
      throw new Error(`Stok "${product.name}" tidak cukup. Tersedia: ${product.stock}`);
    }
    
    total += Number(product.price) * item.quantity;
    orderItemsData.push({
      product_id: item.product_id,
      quantity: item.quantity,
      product_name: product.name,
      product_price: Number(product.price),
      subtotal: Number(product.price) * item.quantity
    });
  }

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        user_id: data.user_id,
        total,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    const orderItems = [];
    for (const item of data.orderItems) {
      const orderItem = await tx.orderItem.create({
        data: {
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
        },
        include: {
          product: {
            select: { id: true, name: true, price: true }
          }
        }
      });

      await tx.product.update({
        where: { id: item.product_id },
        data: { stock: { decrement: item.quantity } }
      });

      orderItems.push(orderItem);
    }

    return {
      order_id: order.id,
      user: order.user,
      total: order.total,
      items: orderItems.map(item => ({
        product_id: item.product_id,
        product_name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: Number(item.product.price) * item.quantity
      })),
      total_items: orderItems.length,
      created_at: order.createdAt
    };
  });
};

export const deleteOrder = async (id: string): Promise<Order> => {
  const numId = parseInt(id);

  return await prisma.order.update({
    where: { id: numId, deletedAt: null },
    data: { deletedAt: new Date() },
  });
};
