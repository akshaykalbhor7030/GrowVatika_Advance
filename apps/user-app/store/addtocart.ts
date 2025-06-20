import { create } from "zustand";

export const addtocartStore = create((set) => ({
  addToCartVisibility: false,
  updateAddToCartStore: (newAddToCartVisibility: boolean) =>
    set({ addToCartVisibility: newAddToCartVisibility }),
}));
