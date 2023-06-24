import React from 'react'
import { AnimatePresence } from 'framer-motion';
import { useToasterStore } from '@/stores/toaster';
import ToastContent from './ToastContent';

const MyToast = () => {

    const messages = useToasterStore(state => state.messages);
    const remove = useToasterStore(state => state.removeMessage);

  return (
    <div
        style={{ 
            zIndex: '9999',
            margin: '20px',
         }} 
        className='fixed top-0 right-0 flex flex-col gap-8'>
        <AnimatePresence>
            {
                messages.map(({ context, title, message, id }) => (
                    <ToastContent 
                        onClose={() => remove(id)}
                        title={title}
                        key={id} 
                        context={context}
                        message={message}
                    />
                ))
            }
        </AnimatePresence>
    </div>
  )
}

export default MyToast