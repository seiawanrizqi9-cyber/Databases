import type { Product } from "../generated/client";
export declare const getAllProducts: () => Promise<{
    products: Product[];
    total: number;
}>;
export declare const getProductById: (id: string) => Promise<Product>;
export declare const searchProducts: (name?: string, min_price?: number, max_price?: number) => Promise<Product[]>;
export declare const createProduct: (data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
}) => Promise<Product>;
export declare const updateProduct: (id: string, data: Partial<Product>) => Promise<Product>;
export declare const deleteProduct: (id: string) => Promise<Product>;
//# sourceMappingURL=product.service.d.ts.map