import { apiRequest, authStorage, type ApiUser } from "@/Services/api";

interface LoginInput {
  username: string;
  password: string;
  remember: boolean;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: ApiUser;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  async login(input: LoginInput) {
    const result = await apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });
    authStorage.save(result.accessToken, result.refreshToken, input.remember);
    return result.user;
  },

  register(input: RegisterInput) {
    const nameParts = input.name.trim().split(/\s+/);
    const username = input.email.split("@")[0];
    return apiRequest<ApiUser>("/users", {
      method: "POST",
      body: JSON.stringify({
        ...input,
        username,
        name: {
          firstname: nameParts[0] || "",
          lastname: nameParts.slice(1).join(" "),
        },
      }),
    });
  },

  logout() {
    const refreshToken = authStorage.getRefreshToken();
    authStorage.clear();
    return apiRequest<{ message: string }>(
      "/auth/logout",
      {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      },
      false,
    ).catch(() => undefined);
  },
};
