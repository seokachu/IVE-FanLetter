import { IsLoginMode } from "@/types";
import { create } from "zustand";

const useLoginModeStore = create<IsLoginMode>((set) => ({
  isLoginMode: false,
  actions: {
    setIsLoginMode: (mode: boolean) => set({ isLoginMode: mode }),
  },
}));

export const useIsLoginMode = () =>
  useLoginModeStore((state) => state.isLoginMode);
export const useIsLoginActions = () =>
  useLoginModeStore((state) => state.actions);
