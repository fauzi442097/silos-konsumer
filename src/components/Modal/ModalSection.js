import React from 'react'

const ModalHeader = ({ children }) => {
    return (
        <div className='flex justify-between items-baseline px-6 py-4'>
            { children }
        </div>
    )
}

const ModalTitle = ({ title, subTitle }) => {
    return (
      <div>
        <h3 className='mb-1'> {title} </h3>
        <p className='font-inter-medium text-muted text-md'> {subTitle} </p>
      </div>
    )
}
  
const ModalBody = ({ children }) => {
    return (
        <div className='px-6 py-3 flex-auto modal-body my-2'>
            { children }
        </div>
    )
}
  
const ModalFooter = ({ children }) => {
    return (
        <div className='modal-footer bg-main px-6 py-4 dark:bg-dark-depth2'>
            { children }
        </div>
    )
}

const Modal = {
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter,
    Title: ModalTitle
}


export default Modal