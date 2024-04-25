import { create } from "zustand";

interface projectState {
  colors: object;
}

const useProjectStore = create<projectState>()((set) => ({
  colors: {},
}));
