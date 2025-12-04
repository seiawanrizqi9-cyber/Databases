import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import { createProduct, deleteProduct, getAllProducts, getProductById, searchProducts, updateProduct } from "../services/product.service"

export const getAll = (_req: Request, res: Response) => {
    const { products, total } = getAllProducts()

    successResponse(
        res,
        "Produk berhasil diambil",
        {
            jumlah: total,
            data: products
        }
    )
}

export const getById = (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("Paramnya gk ada wok")
    }

    const product = getProductById(req.params.id)

    successResponse(
        res,
        "Produk berhasil diambil",
        product
    )
}

export const search = (req: Request, res: Response) => {
    const { name, max_price, min_price } = req.query;

    const result = searchProducts(name?.toString(), max_price?.toString(), min_price?.toString())

    successResponse(
        res,
        "Produk berhasil diambil",
        result
    )
}

export const create = (req: Request, res: Response) => {
    const { nama, deskripsi, harga } = req.body

    const products = createProduct(nama, deskripsi, harga)

    successResponse(
        res,
        "Produk berhasil ditambahkan",
        products,
        null,
        201,
    )
}

export const update = (req: Request, res: Response) => {
    const product = updateProduct(req.params.id!, req.body)

    successResponse(
        res,
        "Produk berhasil diupdate",
        product
    )
}

export const remove = (req: Request, res: Response) => {
    const deleted = deleteProduct(req.params.id!)

    successResponse(
        res,
        "Produk berhasil dihapus",
        deleted
    )
}