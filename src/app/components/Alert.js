import React, { useMemo } from 'react'
import { motion } from "framer-motion"
import { TfiClose } from "react-icons/tfi"
import { useTheme } from '../hooks/ThemeContext'
import notificationStyle from '../utils/notificationStyle'

const getTitleAlert = (title, alertType) => {
    if  ( !title && alertType == 'warning' ) return 'Warning';
    if  ( !title && alertType == 'success' ) return 'Sukses';
    if  ( !title && alertType == 'error' ) return 'Error';
    return 'Info';
}

const getColorAlert = (alertType) => {
    if ( alertType == 'success' ) return 'text-primary dark:text-[#50cd89]';
    if ( alertType == 'warning' ) return 'text-yellow-logo dark:text-yellow-500';
    if ( alertType == 'error' ) return 'text-danger'
    return 'text-dark-blue-logo dark:text-[rgb(121,122,221)]';
}

const Alert = ({ type, title, message, onClose }) => {

   const { theme } = useTheme();
   const alertType = !type ? 'primary' : type;
   const alertIcon = useMemo(() => notificationStyle.setIcon(alertType, theme), [alertType, theme]);
   const bgColor = useMemo(() => notificationStyle.setBgColor(alertType, theme), [alertType, theme]);
   const textColor = useMemo(() => getColorAlert(alertType), [alertType]);
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
              <div className={`${bgColor} rounded-full h-7 w-7 flex items-center justify-center`}>
                  {alertIcon}
              </div>
              <div className="flex flex-col pr-0 sm:pr-10">
                  <h4 className={`mb-1 font-inter-semibold ${textColor}`}>{alertTitle}</h4>
                  <span className='dark:text-grey'>{message}</span>
              </div>
   
              <button type="button" onClick={onClose} className="absolute sm:relative m-2 sm:m-0 top-0 end-0 p-2 rounded-md sm:ml-auto hover:bg-gray-100 dark:hover:bg-gray-500 transition-all duration-300">
                  <TfiClose className='text-sm text-gray-400 '/>
              </button>
          </motion.div>
    )
}


export default Alert