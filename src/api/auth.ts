import { http } from "./client";
import type { AuthUser } from "../contexts/AuthContext";

export const authApi = {
  currentUser: () => http.get<AuthUser | null>("/me"),
  login: async (username: string, password: string): Promise<void> => {
    await http.post("/login", new URLSearchParams({ username, password }));
  },
  logout: async (): Promise<void> => {
    await http.post("/logout");
  },
  signup: (data: FormData) => http.form<void>("POST", "/signup", data),
};
