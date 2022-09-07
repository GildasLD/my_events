import create from "zustand";

export const useStore = create((set) => ({
  authData: localStorage.getItem("my_events")
    ? JSON.parse(localStorage.getItem("my_events"))
    : null,
  setAuthData: (newAuthData) => set((state) => ({ authData: newAuthData })),
}));
