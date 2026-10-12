import { http } from "./client";
import type { CartItem } from "../types";

export type AccountData = {
  image?: string | null;
  username: string;
  name: string;
  surname: string;
  email: string;
  contact: string;
};

export const customerApi = {
  cart: () => http.get<CartItem[]>("/user/cart"),
  addToCart: (productId: string | number) =>
    http.post<void>("/user/cart", { productId }),
  removeFromCart: (id: CartItem["id"]) =>
    http.delete<void>(`/user/cart/${id}`),
  wishlist: () => http.get<CartItem[]>("/user/wishlist"),
  addToWishlist: (productId: string | number) =>
    http.post<void>("/user/wishlist", { productId }),
  removeFromWishlist: (id: CartItem["id"]) =>
    http.delete<void>(`/user/wishlist/${id}`),
  account: () => http.get<AccountData>("/user/account"),
  updateAccount: (data: Record<string, FormDataEntryValue>) =>
    http.post<AccountData>("/user/account", data),
};
