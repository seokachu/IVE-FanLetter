import { membersData } from "@/data/members";
import { MembersState } from "@/types";
import { create } from "zustand";

const useMembersStore = create<MembersState>((set) => ({
  selectedMember: membersData[0].name,
  actions: {
    setSelectedMember: (selected: string) => set({ selectedMember: selected }),
  },
}));

export const useSelectedMember = () =>
  useMembersStore((state) => state.selectedMember);

export const useSelectedActions = () =>
  useMembersStore((state) => state.actions);
