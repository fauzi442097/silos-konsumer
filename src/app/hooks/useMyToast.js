import { useCallback, useMemo } from "react";
import { useToasterStore } from "../stores/toaster";


const TIMEOUT = 4000;
// const TIMEOUT = 3000;

export function useMyToast() {
    const store = useToasterStore();
    const generateId = useCallback(() => {
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    }, [])

    const show = useCallback(( 
        message, 
        title, 
        context = "default", 
        timeout = TIMEOUT
    ) => {
        const id = generateId();
        store.addMessage({ id, title, message, context });
        setTimeout(() => {
            store.removeMessage(id)
        }, timeout);
    }, [store, generateId]) ;

    return useMemo(() => ({
        default: (message, title , timeout = TIMEOUT) => show(message, title, "default", timeout),
        info: (message, title, timeout = TIMEOUT) => show(message, title, "info", timeout),
        success: (message, title, timeout = TIMEOUT) => show(message, title, "success", timeout),
        warning: (message, title, timeout = TIMEOUT) => show(message, title, "warning", timeout),
        error: (message, title, timeout = TIMEOUT) => show(message, title, "error", timeout),
        clear: () => store.clearMessages()
    }), [show, store]);
}

