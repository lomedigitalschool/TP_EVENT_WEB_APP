import { create } from 'zustand';
import api from '../api';

const useStore = create((set) => ({
  events: [],
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/events');
      set({ events: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createEvent: async (eventData) => {
    set({ loading: true });
    try {
      await api.post('/events', eventData);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  addInvitee: async (inviteeData) => {
    set({ loading: true });
    try {
      await api.post('/invitees', inviteeData);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateResponse: async (inviteeId, response) => {
    set({ loading: true });
    try {
      await api.put(`/invitees/${inviteeId}`, { response });
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));

export default useStore;