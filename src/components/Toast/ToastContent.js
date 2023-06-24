import React, { useMemo } from 'react'
import { motion } from "framer-motion"
import styles from './Notification.module.css'
import { TfiClose } from "react-icons/tfi"
import notificationStyle from '@/app/utils/notificationStyle';
import { useTheme } from '@/hooks/ThemeContext';


const ToastContent = ({ 
   message, 
   title, 
   context = "default", 
   onClose 
}) => {

  const { theme } = useTheme();
  const icon = useMemo(() => notificationStyle.setIcon(context, theme), [context, theme]);
  const bgColor = useMemo(() => notificationStyle.setBgColor(context, theme), [context, theme]);
  const bgColorProgress = useMemo(() => notificationStyle.setBgColorProgress(context, theme), [context, theme]);
  const textColor = useMemo(() => notificationStyle.setColor(context, theme), [context, theme]);
  const gradientColor = useMemo(() => notificationStyle.setGradient(context, theme), [context, theme]);
  const titleToast = useMemo(() => notificationStyle.setTitle(context, title), [context, title]);
  const messageColor = theme == 'dark' ? 'text-grey' : '';

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

        <div className={`${bgColor} rounded-full h-7 w-7 flex items-center justify-center`}>
          {icon}
         </div>

        <div className="d-flex flex-column pe-0">
            <h4 className={`mb-1 ${textColor}`}>{titleToast}</h4>
            <p className={`${messageColor} mb-0`} dangerouslySetInnerHTML={{ __html: message }} />
        </div>
        
    
        <button type="button" onClick={onClose} className="absolute sm:relative m-2 sm:m-0 top-0 end-0 p-2 rounded-md sm:ml-auto hover:bg-gray-100 dark:hover:bg-gray-500 transition-all duration-300">
            <TfiClose className='text-sm text-gray-400 '/>
         </button>

         <div style={bgProgressBar} className={`${styles['notification']} absolute left-0 bottom-0 start-0 h-[8px] w-full rounded-b-xl`}>
        </div>
    </motion.div>
  )
}

export default ToastContent