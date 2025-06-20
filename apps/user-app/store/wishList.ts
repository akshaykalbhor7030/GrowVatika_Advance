import { create } from "zustand";

export const wishListStore = create((set) => ({
  wishListVisibility: false,
  updateWishListVisibility: (newwishListVisibility: boolean) =>
    set({ wishListVisibility: newwishListVisibility }),
}));