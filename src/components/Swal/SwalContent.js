import React, { useMemo } from 'react'
import { motion } from "framer-motion"
import Button from '../Button'
import notificationStyle from '@/app/utils/notificationStyle'
import { useTheme } from '@/hooks/ThemeContext'
import { cn } from '@/lib/utils'

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


const getButtonCloseStyle = (type, onClose, labelCancel) => {
   if ( type == 'success' ) return <Button onClick={onClose}> {labelCancel || 'Tutup'} </Button>
   if ( type == 'warning' ) return <Button variant={'warning'} onClick={onClose}> {labelCancel || 'Tutup'} </Button>
   if ( type == 'error' ) return <Button variant={'danger'} onClick={onClose}> {labelCancel || 'Tutup'} </Button>
   return <Button variant={'info'} onClick={onClose}> {labelCancel || 'Tutup'} </Button>
}

const getButtonSubmitStyle = (type, onSubmit, labelSubmit) => {
   if ( type == 'success' ) return <Button onClick={onSubmit}> {labelSubmit} </Button>
   if ( type == 'warning' ) return <Button variant={'warning'} onClick={onSubmit}> {labelSubmit} </Button>
   if ( type == 'error' ) return <Button variant={'danger'} onClick={onSubmit}> {labelSubmit} </Button>
   return <Button variant={'info'} onClick={onSubmit}> {labelSubmit} </Button>
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
  const gradientColor = useMemo(() => notificationStyle.setGradient(context, theme), [context, theme]);
  const titleAlert = useMemo(() => notificationStyle.setTitle(context, title), [context, title]);
  const buttonCloseElement = useMemo(() => getButtonCloseStyle(context, onClose, labelCancel), [context, onClose, labelCancel]);
  const buttonSubmitElement = useMemo(() => getButtonSubmitStyle(context, onSubmit, labelSubmit), [context, onSubmit, labelSubmit]);


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
            <div className={cn([
              'w-[35px] h-[35px] text-center rounded-full flex justify-center items-center',
              context == 'info' && 'bg-dark-blue-logo dark:bg-[rgb(121,122,221)]',
              context == 'success' && 'bg-primary dark:bg-[#50cd89]',
              context == 'warning' && 'bg-yellow-logo dark:bg-yellow-500',
              context == 'error' && 'bg-danger',
            ])}>
               {icon}
            </div>
        </div>
        <div className='flex flex-col justify-center pt-6 pr-8 w-full pb-6'>
            <div>
              <h2 className={cn([
                'mb-2',
                context == 'info' && 'text-dark-blue-logo dark:text-[rgb(121,122,221)]',
                context == 'success' && 'text-primary dark:text-[#50cd89]',
                context == 'warning' && 'text-yellow-logo dark:text-yellow-500',
                context == 'error' && 'text-danger',
              ])}> {dialogType == 'confirm' ? titleAlert || 'Konfirmasi' : titleAlert} </h2>
              <p className={cn('text-lg dark:text-grey')} dangerouslySetInnerHTML={{ __html: message }} />
            </div>
            <div className='flex gap-4 text-right mt-4 justify-end'>
              { dialogType == 'confirm' ? (
                    <>
                        <Button variant={'clean'} onClick={onClose} className={theme == 'dark' && 'btn-clean-dark'}> {labelCancel || 'Tutup' } </Button> 
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