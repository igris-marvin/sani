import {
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { authApi } from "../api/auth";
import { getErrorMessage } from "../api/client";
import { AuthContext } from "../contexts/AuthContext";
import type { AuthUser } from "../contexts/AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  const refresh = async () => {
    try {
      const currentUser = await authApi.currentUser();
      setUser(currentUser);
      setError("");
      return currentUser;
    } catch (requestError) {
      if (axios.isAxiosError(requestError) && requestError.response?.status === 401) {
        setUser(null);
        setError("");
        return null;
      }
      setUser(null);
      setError(getErrorMessage(requestError, "Could not verify your session."));
      return null;
    } finally {
      setReady(true);
    }
  };

  useEffect(() => {
    authApi.currentUser()
      .then((currentUser) => {
        setUser(currentUser);
        setError("");
      })
      .catch((requestError: unknown) => {
        setUser(null);
        if (axios.isAxiosError(requestError) && requestError.response?.status === 401) {
          setError("");
        } else {
          setError(getErrorMessage(requestError, "Could not verify your session."));
        }
      })
      .finally(() => setReady(true));
  }, []);

  const login = async (username: string, password: string) => {
    await authApi.login(username, password);
    return refresh();
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      setError("");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not log out."));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        error,
        login,
        logout,
        isAdmin: !!user?.roles.includes("ADMIN"),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
