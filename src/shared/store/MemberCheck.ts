import { Members, MembersState } from "@/types";
import { create } from "zustand";

const useMembersStore = create<MembersState>((set) => ({
  selectedMember: "",
  actions: {
    setSelectedMember: (selected: string) => set({ selectedMember: selected }),
  },
}));

export const useSelectedMember = () =>
  useMembersStore((state) => state.selectedMember);

export const useSelectedActions = () =>
  useMembersStore((state) => state.actions);
