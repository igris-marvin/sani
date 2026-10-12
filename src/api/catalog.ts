import { http } from "./client";
import type { Product } from "../types";

export type ProductOptions = {
  categories: string[];
  statuses: string[];
};

export type ProductDetails = {
  m_product_id?: string | number;
  m_product_name?: string;
  m_style?: string;
  m_length?: number;
  m_width?: number;
  m_height?: number;
  m_price?: number;
  m_quantity?: number;
  m_category?: string;
  m_status?: string;
  m_product_description?: string;
  images?: { image_id: string | number; image_data: string }[];
};

export type DashboardData = {
  prods_count: number;
  users_count: number;
  category_count_list: Record<string, number | undefined>;
};

export const catalogApi = {
  products: (category: string) =>
    http.get<Product[]>(`/shop/products?${new URLSearchParams({ category })}`),
  adminProducts: (category?: string | null) => {
    const query = category ? `?${new URLSearchParams({ category })}` : "";
    return http.get<Product[]>(`/admin/products${query}`);
  },
  product: (id: string) => http.get<ProductDetails>(`/admin/products/${id}`),
  options: () => http.get<ProductOptions>("/admin/options"),
  saveProduct: (id: string | undefined, data: FormData) =>
    http.form<void>("POST", id ? `/admin/products/${id}` : "/admin/products", data),
  removeProduct: (id: Product["product_id"]) =>
    http.delete<void>(`/admin/products/${id}`),
  dashboard: () => http.get<DashboardData>("/admin/dashboard"),
};
