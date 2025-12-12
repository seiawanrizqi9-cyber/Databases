import { getPrisma } from "../prisma";

const prisma = getPrisma();

export const getAllCategories = async () => {
  return await prisma.category.findMany();
};

export const getCategoryById = async (id: string) => {
  const numId = parseInt(id);

  return await prisma.category.findUnique({
    where: { id: numId },
  });
};

export const createCategory = async (name: string) => {
  const isExist = await prisma.category.findUnique({ where: { name } });
  if (isExist) throw new Error("Nama kategori sudah ada");

  return await prisma.category.create({
    data: {
      name,
    },
  });
};

export const categoryUpdate = async (id: string, name: string) => {
  const numId = parseInt(id);

  return await prisma.category.update({
    where: { id: numId },
    data: { name },
  });
};

export const removeCategory = async (id: string) => {
  const numId = parseInt(id);

  return await prisma.category.delete({ where: { id: numId } });
};