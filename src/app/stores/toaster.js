import create from 'zustand';
const MAX_TOASTS = 5;

export const useToasterStore = create((set, get) => ({
    messages: [],
    addMessage: (message) => {
        set({ messages: [message, ...get().messages].slice(0, MAX_TOASTS) });
    },
    removeMessage: (id) => {
        set({ messages: get().messages.filter(message => message.id != id) })
    },
    clearMessages: () => {
        set({ messages: []})
    }
}));

