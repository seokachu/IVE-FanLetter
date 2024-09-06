import { AuthState } from "@/types";
import { create } from "zustand";

const useAuthStore = create<AuthState>((set) => ({
  userId: "",
  nickname: "",
  avatar: "",
  actions: {
    setUserId: (userId: string) => set({ userId }),
    setNickname: (nickname) => set({ nickname }),
    setAvatar: (avatar) => set({ avatar }),
  },
}));

export const useUserId = () => useAuthStore((state) => state.userId);
export const useNickname = () => useAuthStore((state) => state.nickname);
export const useAvatar = () => useAuthStore((state) => state.avatar);
export const useAuthActions = () => useAuthStore((state) => state.actions);
