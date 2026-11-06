// 로그인 토큰 관련 전역 함수
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  init: () => void;
  updateAccessToken: (newAccessToken: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,

  // ---------------------- 로그인 --------------------------
  login: (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("isLoggedIn", "true");
    set({
      isLoggedIn: true,
      accessToken,
      refreshToken,
    });
  },

  // ---------------------- 로그아웃 --------------------------
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
    set({
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
    });
  },

  // ---------------------- 초기값 --------------------------
  init: () => {
    const saved = localStorage.getItem("isLoggedIn") === "true";
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    set({
      isLoggedIn: saved,
      accessToken,
      refreshToken,
    });
  },

  // ---------------------- 재발행 토큰 --------------------------
  updateAccessToken: (newAccessToken: string) => {
    localStorage.setItem("accessToken", newAccessToken);
    set({ accessToken: newAccessToken });
  },
}));
