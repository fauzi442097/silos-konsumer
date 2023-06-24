import {create} from 'zustand';

export const useSwalStore = create((set, get) => ({
   messages: [],
   createAlert: (message) => {
        set({ messages: [message, ...get().messages].slice(0, 1) });
   },
   removeAlert: (id) => {
        set({ messages: get().messages.filter(message => message.id != id) })
   },
   clearAlert: () => {
        set({ messages: []})
   },
}));

