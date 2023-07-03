import React, { useMemo } from 'react'
import { motion } from "framer-motion"
import { useTheme } from '../hooks/ThemeContext'
import notificationStyle from '../app/utils/notificationStyle'
import { cn } from '@/lib/utils'

const getTitleAlert = (title, alertType) => {
    if  ( !title && alertType == 'warning' ) return 'Warning';
    if  ( !title && alertType == 'success' ) return 'Sukses';
    if  ( !title && alertType == 'error' ) return 'Error';
    return 'Info';
}


const closeIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 24 24'><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' d='m7 7l10 10M7 17L17 7'/></svg>"

const Alert = ({ type, title, message, onClose }) => {

   const { theme } = useTheme();
   const alertType = !type ? 'primary' : type;
   const alertIcon = useMemo(() => notificationStyle.setIcon(alertType, theme), [alertType, theme]);
   const gradientColor = useMemo(() => notificationStyle.setGradient(alertType, theme), [alertType, theme]);
   const alertTitle = title || getTitleAlert(title, alertType);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            style={{ 
                background: gradientColor,
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
           }}className={`mt-2 rounded-xl bg-white flex flex-col items-start gap-4 sm:flex-row p-5 mb-10 w-full`}>
              <div className={cn([
                'rounded-full h-7 w-7 flex items-center justify-center',
                alertType == 'info' && 'bg-dark-blue-logo dark:bg-[rgb(121,122,221)]',
                alertType == 'success' && 'bg-primary dark:bg-[#50cd89]',
                alertType == 'warning' && 'bg-yellow-logo dark:bg-yellow-500',
                alertType == 'error' && 'bg-danger',
              ])}>
                  {alertIcon}
              </div>

              <div className="flex flex-col pr-0 sm:pr-10">
                  <h4 className={cn([
                    'mb-1 font-inter-semibold',
                    alertType == 'success' && 'text-primary dark:text-[#50cd89]',
                    alertType == 'warning' && 'text-yellow-logo dark:text-yellow-500',
                    alertType == 'error' && 'text-danger',
                    alertType == 'info' && 'text-dark-blue-logo dark:text-[rgb(121,122,221)]'
                  ])}> {alertTitle} </h4>
                  <span className='dark:text-grey'>{message}</span>
              </div>
   
              <button type="button" onClick={onClose} className="absolute sm:relative m-2 sm:m-0 top-0 end-0 p-2 rounded-md sm:ml-auto hover:bg-gray-100 dark:hover:bg-gray-500 transition-all duration-300">
                  <span className='text-sm text-gray-400' dangerouslySetInnerHTML={{ __html: closeIcon }}/>
              </button>
          </motion.div>
    )
}


export default Alert