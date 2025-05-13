import { create } from "zustand";

export const useEventStore = create((set) => ({
  events: {},
  setEvents: (data) => set({ events: data }),
}));
