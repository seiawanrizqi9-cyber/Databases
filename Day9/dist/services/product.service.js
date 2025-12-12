import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const getAllProducts = async () => {
    const products = await prisma.product.findMany({
        include: { category: true },
    });
    const total = products.length;
    return { products, total };
};
export const getProductById = async (id) => {
    const numId = parseInt(id);
    const product = await prisma.product.findUnique({
        where: { id: numId },
        include: { category: true },
    });
    if (!product) {
        throw new Error("Product tidak ditemukan");
    }
    return product;
};
export const searchProducts = async (name, min_price, max_price) => {
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
export const createProduct = async (data) => {
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
export const updateProduct = async (id, data) => {
    await getProductById(id);
    const numId = parseInt(id);
    return await prisma.product.update({
        where: { id: numId },
        data,
    });
};
export const deleteProduct = async (id) => {
    const numId = parseInt(id);
    return await prisma.product.update({
        where: { id: numId },
        data: { deletedAt: new Date() },
    });
};
//# sourceMappingURL=product.service.js.map