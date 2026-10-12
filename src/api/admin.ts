import { http } from "./client";
import type { Customer } from "../types";

export type AdminProfileData = {
  image?: string | null;
  id: string | number;
  username: string;
  name: string;
  surname: string;
  contact: string;
  email: string;
};

export const adminApi = {
  customers: () => http.get<Customer[]>("/admin/users"),
  removeCustomer: (id: Customer["user_id"]) =>
    http.delete<void>(`/admin/users/${id}`),
  profile: () => http.get<AdminProfileData>("/admin/profile"),
  register: (data: FormData) => http.form<void>("POST", "/admin/register", data),
};
