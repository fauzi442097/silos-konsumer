import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'font-inter-medium inline-flex items-center justify-center outline-none px-4 py-[0.65rem] leading-normal border border-transparent rounded-xl text-white dark:enabled:text-grey transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60', 
  {
    variants:{
     variant: {
        primary: [
          'bg-primary border-primary dark:bg-primary-800 dark:border-primary-800',
          'enabled:hover:bg-primary-800 enabled:hover:border-primary-800 enabled:hover:text-white',
          'dark:enabled:hover:bg-primary-900 dark:enabled:hover:border-primary-900'
        ],
        light: [
          'bg-primary-100 border-primary-100 text-primary dark:enabled:bg-light-primary dark:enabled:text-primary-800 dark:enabled:border-light-primary',
          'enabled:hover:bg-primary enabled:hover:border-primary enabled:hover:text-white',
          'dark:enabled:hover:bg-primary-800 dark:enabled:hover:border-primary-800 dark:enabled:hover:text-grey'
        ],
        outline: [
          'border-primary text-primary bg-white dark:bg-transparent dark:enabled:text-primary-600 dark:border-primary-800',
          'enabled:hover:bg-primary enabled:hover:border-primary enabled:hover:text-white',
          'dark:enabled:hover:bg-primary-900 dark:enabled:hover:border-primary-900 dark:enabled:hover:text-grey'
        ], 
        secondary: [
          'bg-slate-200 text-slate-700 dark:enabled:bg-slate-600 dark:enabled:border-slate-600',
          'enabled:hover:bg-slate-300',
          'dark:enabled:hover:border-slate-700 dark:enabled:hover:bg-slate-700'
        ], 
        clean: [
          'border-gray-400 bg-white text-gray-500 dark:bg-transparent dark:enabled:border-gray-500 dark:enabled:text-grey',
          'enabled:hover:bg-gray-100 enabled:hover:text-gray-600',
          'dark:enabled:hover:bg-gray-600 dark:enabled:hover:border-gray-600'
        ], 
        warning: [
          'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700'
        ],
        danger: [
          'bg-[#f1416c] hover:bg-[#cc3b61] dark:bg-[#c13a5d] dark:hover:bg-[#a4304e]'
        ],
        info: [
          'bg-dark-blue-logo hover:bg-[#1c1b80] dark:bg-[rgb(121,122,221)] dark:hover:bg-[rgb(110,111,201)]'
        ]
     },
     size: {
      default: 'px-4 py-[0.65rem] text-base',
      sm: 'leading-[1.35rem] text-sm py-[0.55rem] px-[0.75rem]',
      lg: 'leading-6 py-[0.825rem] px-[1.42rem] text-[1.08rem]',
     }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default'
    } 
  }
)

const Button = ({ className, variant, size, ...props }) => {
  return <button className={cn(buttonVariants({variant, size, className}))} {...props}/>
}

export const ButtonCloseModal = ({ ...props}) => {
  const closeIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24'><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='m7 7l10 10M7 17L17 7'/></svg>"
  return (
    <button className='bg-slate-100 dark:hover:bg-[#2f3133] shadow-lg dark:bg-dark-depth2 rounded-lg p-1.5 border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all duration-300' {...props}> 
      <span className='text-xl text-slate-700 dark:text-grey' dangerouslySetInnerHTML={{ __html: closeIcon }}/>
    </button>
  )
}

export default Button