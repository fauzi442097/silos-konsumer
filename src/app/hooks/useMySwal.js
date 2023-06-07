import { useCallback, useMemo } from "react";
import { useSwalStore } from "../stores/swal";

export function useMySwal() {
    const store = useSwalStore();

    const generateId = useCallback(() => {
         return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
   }, [])

    const id = generateId();

    const show = useCallback(({
         dialogType,
         id,
         message,
         onClose, 
         title,
         type,
         labelSubmit,
         onSubmit,
         labelCancel  
      }) => {
        store.createAlert({
            dialogType,
            id,
            message,
            onClose, 
            title,
            type,
            labelSubmit,
            onSubmit,
            labelCancel
        });
    }, [store]) ;

    return useMemo(() => ({
        default: (message, title, onClose) => show({dialogType: "info", id, message, title, type: "default", onClose}),
        info: (message, title, onClose) => show({dialogType: "info", id, message, title, type: "info", onClose}),
        success: (message, title, onClose) => show({dialogType: "info", id, message, title, type: "success", onClose}),
        warning: (message, title, onClose) => show({dialogType: "info", id, message, title, type: "warning", onClose}),
        error: (message, title, onClose) => show({dialogType: "info", id, message, title, type: "error", onClose}),
        clear: () => store.clearAlert(),
        confirm: ({type, title, message, labelSubmit, onSubmit, labelCancel, onCancel}) => show({dialogType: "confirm", id, type, title, message, labelSubmit, onSubmit, labelCancel, onCancel})
    }), [show, store, id]);
}
