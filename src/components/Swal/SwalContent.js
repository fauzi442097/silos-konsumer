import React, { useMemo } from 'react'
import { motion } from "framer-motion"
import styles from './swal.module.css'
import Button from '../Button'
import notificationStyle from '@/app/utils/notificationStyle'
import { useTheme } from '@/hooks/ThemeContext'


const animateContainer = {
  hidden: { 
     opacity: 0,
     scale: 0,
  },
  animate: {
     scale: 0.5
  },
  show: { 
     opacity: 1,
     scale: 1
  },
  exit: {
     opacity: 0,
     scale: 0
  }
}

const animateBackdrop = {
  hidden: { 
     opacity: 0 
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3
    }
  },
  exit: {
     opacity: 0
  }
}


const getButtonCloseStyle = (type, theme, onClose, labelCancel) => {
   if ( type == 'success' ) return <Button.Primary onClick={onClose}> {labelCancel || 'Tutup'} </Button.Primary>
   if ( type == 'warning' ) return <Button.Custom className={`${theme == 'light' ? 'btn-custom-warning' : 'btn-custom-warning-dark'}`} onClick={onClose}> {labelCancel || 'Tutup'} </Button.Custom>
   if ( type == 'error' ) return <Button.Custom className={`${theme == 'light' ? 'btn-custom-danger' : 'btn-custom-danger-dark'}`} onClick={onClose}> {labelCancel || 'Tutup'} </Button.Custom>
   return <Button.Custom className={`${theme == 'light' ? 'btn-custom-info' : 'btn-custom-info-dark'}`} onClick={onClose}> {labelCancel || 'Tutup'} </Button.Custom>
}

const getButtonSubmitStyle = (type, theme, onSubmit, labelSubmit) => {
   if ( type == 'success' ) return <Button.Primary onClick={onSubmit}> {labelSubmit} </Button.Primary>
   if ( type == 'warning' ) return <Button.Custom className={`${theme == 'light' ? 'btn-custom-warning' : 'btn-custom-warning-dark'}`} onClick={onSubmit}> {labelSubmit} </Button.Custom>
   if ( type == 'error' ) return <Button.Custom className={`${theme == 'light' ? 'btn-custom-danger' : 'btn-custom-danger-dark'}`} onClick={onSubmit}> {labelSubmit} </Button.Custom>
   return <Button.Custom className={`${theme == 'light' ? 'btn-custom-info' : 'btn-custom-info-dark'}`} onClick={onSubmit}> {labelSubmit} </Button.Custom>
}

const SwalContent = ({ 
  message, 
  title, 
  context, 
  labelCancel,
  onClose, 
  onSubmit, 
  labelSubmit,
  dialogType 
}) => {


  const { theme } = useTheme();
  const icon = useMemo(() => notificationStyle.setIcon(context, theme), [context, theme]);
  const bgColor = useMemo(() => notificationStyle.setBgColor(context, theme), [context, theme]);
  const textColor = useMemo(() => notificationStyle.setColor(context, theme), [context, theme]);
  const gradientColor = useMemo(() => notificationStyle.setGradient(context, theme), [context, theme]);
  const titleAlert = useMemo(() => notificationStyle.setTitle(context, title), [context, title]);

  const buttonCloseElement = useMemo(() => getButtonCloseStyle(context, theme, onClose, labelCancel), [context, theme, onClose, labelCancel]);
  const buttonSubmitElement = useMemo(() => getButtonSubmitStyle(context, theme, onSubmit, labelSubmit), [context, theme, onSubmit, labelSubmit]);

  const messageColor = theme == 'dark' ? 'text-grey' : '';

  return (
    <motion.div 
    key={'swal'}
    variants={animateBackdrop} 
    initial="hidden"
    animate="show"
    exit="exit"
    className={'fixed inset-0 bg-[#00000033] dark:bg-[#060e075c] transition-opacity backdrop-blur-sm z-50'}
  >
    <div className={'flex items-center justify-center h-[70%]'}>
      <motion.div 
        variants={animateContainer}
        className='bg-white rounded-2xl flex items-start w-[400px]'
        style={{ background: gradientColor }}
      >
        <div className='py-6 px-6'>
            <div className={`w-[35px] h-[35px] text-center rounded-full ${bgColor} flex justify-center items-center`}>
               {icon}
            </div>
        </div>
        <div className='flex flex-col justify-center pt-6 pr-8 w-full pb-6'>
            <div>
              <h2 className={`${textColor} mb-2`}> {dialogType == 'confirm' ? titleAlert || 'Konfirmasi' : titleAlert} </h2>
              <p className={`${messageColor} text-lg`} dangerouslySetInnerHTML={{ __html: message }} />
            </div>
            <div className='flex gap-4 text-right mt-4 justify-end'>
              { dialogType == 'confirm' ? (
                    <>
                        <Button.Clean onClick={onClose} className={theme == 'dark' && 'btn-clean-dark'}> {labelCancel || 'Tutup' } </Button.Clean> 
                        {buttonSubmitElement}
                    </>
                  ) : buttonCloseElement 
              }
            </div>
        </div>
      </motion.div>
    </div>
    </motion.div>
  )
}

export default SwalContent