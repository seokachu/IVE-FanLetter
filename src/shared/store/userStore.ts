import { UserState } from "@/types";
import { create } from "zustand";

const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  actions: {
    setUserInfo: (userInfo) => set({ userInfo }),
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserActions = () => useUserStore((state) => state.actions);
