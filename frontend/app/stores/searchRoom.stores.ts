"use client";
import { create } from "zustand";
import { Room } from "../types/room.types";

interface Props {
  searchResults: Room[];
  setSearchResults: (results: Room[]) => void;
  clearSearchResults: () => void;
}

export const useSearchRoomStore = create<Props>((set) => ({
  searchResults: [],
  setSearchResults: (results: Room[]) => set({ searchResults: results }),
  clearSearchResults: () => set({ searchResults: [] }),
}));
