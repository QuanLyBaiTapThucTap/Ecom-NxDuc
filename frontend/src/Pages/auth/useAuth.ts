import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiRequest, authStorage, type ApiUser } from "@/Services/api";
import { authService } from "./_services/authService";
function useAuthState() {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    const clear = () => {
      setUser(null);
      setError("");
    };
    window.addEventListener("auth-cleared", clear);
    if (authStorage.getAccessToken()) {
      apiRequest<ApiUser>("/auth/me")
        .then((value) => {
          if (active) setUser(value);
        })
        .catch((err) => {
          if (active && authStorage.getAccessToken()) setError(err.message);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    } else {
      Promise.resolve().then(() => {
        if (active) setLoading(false);
      });
    }
    return () => {
      active = false;
      window.removeEventListener("auth-cleared", clear);
    };
  }, []);
  return {
    user,
    setUser,
    loading,
    error,
    login: async (input: Parameters<typeof authService.login>[0]) => {
      const value = await authService.login(input);
      setUser(value);
      setError("");

      return value;
    },
    logout: async () => {
      setUser(null);
      await authService.logout();
    },
  };
}
const AuthContext = createContext<ReturnType<typeof useAuthState> | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return createElement(
    AuthContext.Provider,
    { value: useAuthState() },
    children,
  );
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("AuthProvider is required");
  return value;
}
