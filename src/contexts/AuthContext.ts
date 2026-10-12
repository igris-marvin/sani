import { createContext, useContext } from "react";

export type AuthUser = {
  username: string;
  roles: ("ADMIN" | "CUSTOMER")[];
};

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  error: string;
  login: (username: string, password: string) => Promise<AuthUser | null>;
  logout: () => Promise<void>;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
