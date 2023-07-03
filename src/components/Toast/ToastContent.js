import React, { useMemo } from 'react'
import { motion } from "framer-motion"
import styles from './Notification.module.css'
import notificationStyle from '@/app/utils/notificationStyle';
import { useTheme } from '@/hooks/ThemeContext';
import { cn } from '@/lib/utils';


const closeIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24'><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' d='m7 7l10 10M7 17L17 7'/></svg>"

const ToastContent = ({ 
   message, 
   title, 
   context = "info", 
   onClose 
}) => {

  const { theme } = useTheme();
  const icon = useMemo(() => notificationStyle.setIcon(context, theme), [context, theme]);
  const bgColorProgress = useMemo(() => notificationStyle.setBgColorProgress(context, theme), [context, theme]);
  const gradientColor = useMemo(() => notificationStyle.setGradient(context, theme), [context, theme]);
  const titleToast = useMemo(() => notificationStyle.setTitle(context, title), [context, title]);

  const bgProgressBar = {
    "--bg-progressbar": bgColorProgress
  }
  
  return (
    <motion.div
        initial={{ x: +100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: +100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ 
            background: gradientColor,
            boxShadow: '0 3px 10px rgb(0 0 0 / 10%), 0 3px 3px rgb(0 0 0 / 5%)',
            width: '320px'
        }}
        className={`bg-white relative flex items-start gap-4 rounded-xl flex-row p-5 overflow-hidden`}>

        <div className={cn([
          'rounded-full h-7 w-7 flex items-center justify-center',
          context == 'info' && 'bg-dark-blue-logo dark:bg-[rgb(121,122,221)]',
          context == 'success' && 'bg-primary dark:bg-[#50cd89]',
          context == 'warning' && 'bg-yellow-logo dark:bg-yellow-500',
          context == 'error' && 'bg-danger',
        ])}>
          {icon}
         </div>

        <div className="d-flex flex-column pe-0">
            <h4 className={cn([
              'mb-1',
              context == 'info' && 'text-dark-blue-logo dark:text-[rgb(121,122,221)]',
              context == 'success' && 'text-primary dark:text-[#50cd89]',
              context == 'warning' && 'text-yellow-logo dark:text-yellow-500',
              context == 'error' && 'text-danger',
            ])}>{titleToast}</h4>
            <p className={cn('mb-0 dark:text-grey')} dangerouslySetInnerHTML={{ __html: message }} />
        </div>
        
    
        <button type="button" onClick={onClose} className="absolute sm:relative m-2 sm:m-0 top-0 end-0 p-2 rounded-md sm:ml-auto hover:bg-gray-100 dark:hover:bg-gray-500 transition-all duration-300">
            <span className='text-sm text-gray-400' dangerouslySetInnerHTML={{ __html: closeIcon }}/>
         </button>

         <div style={bgProgressBar} className={`${styles['notification']} absolute left-0 bottom-0 start-0 h-[8px] w-full rounded-b-xl`}>
        </div>
    </motion.div>
  )
}

export default ToastContent