const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ACCESS_TOKEN_KEY = "ecom-access-token";
const REFRESH_TOKEN_KEY = "ecom-refresh-token";

export interface ApiUser {
  id: number;
  email: string;
  username: string;
  name: { firstname: string; lastname: string };
  address?: Record<string, unknown>;
  phone?: string;
  role: "admin" | "customer";
}

interface RefreshResponse {
  newAccessToken: string;
}

export const authStorage = {
  getAccessToken: () =>
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () =>
    localStorage.getItem(REFRESH_TOKEN_KEY) ||
    sessionStorage.getItem(REFRESH_TOKEN_KEY),
  save: (accessToken: string, refreshToken: string, remember: boolean) => {
    const storage = remember ? localStorage : sessionStorage;
    const otherStorage = remember ? sessionStorage : localStorage;
    otherStorage.removeItem(ACCESS_TOKEN_KEY);
    otherStorage.removeItem(REFRESH_TOKEN_KEY);
    storage.setItem(ACCESS_TOKEN_KEY, accessToken);
    storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.dispatchEvent(new Event("auth-cleared"));
  },
};

async function refreshAccessToken() {
  const refreshToken = authStorage.getRefreshToken();
  if (!refreshToken) {
    authStorage.clear();
    return null;
  }

  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    authStorage.clear();
    return null;
  }

  const data = (await response.json()) as RefreshResponse;
  const currentAccessToken = data.newAccessToken;
  const storage = localStorage.getItem(REFRESH_TOKEN_KEY)
    ? localStorage
    : sessionStorage;
  storage.setItem(ACCESS_TOKEN_KEY, currentAccessToken);
  return currentAccessToken;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  canRefresh = true,
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const accessToken = authStorage.getAccessToken();
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (response.status === 401 && canRefresh) {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) return apiRequest<T>(path, options, false);
  }

  const data = (await response.json().catch(() => ({}))) as {
    message?: string;
  } & T;
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}
