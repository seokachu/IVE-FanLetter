import { Letters, LettersState } from "@/types";
import { create } from "zustand";

const useLettersStore = create<LettersState>((set) => ({
  lettersInfo: [],
  actions: {
    setLettersInfo: (letters: Letters[]) => set({ lettersInfo: letters }),
  },
}));

export const useLetterInfo = () =>
  useLettersStore((state) => state.lettersInfo);
export const useLetterActions = () => useLettersStore((state) => state.actions);
