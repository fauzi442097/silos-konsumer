import Image from 'next/image'
import React from 'react'

import notDataImg from '../../public/img/no-data-found.png'
import Button from './Button'

const DataNotFound = ({ 
  message = '404 - Data tidak ditemukan',
  withAction = false,
  handleTryAgain,
}) => {
  return (
    <div className='w-full flex flex-col justify-center items-center mt-4'>
        <Image src={notDataImg} height={300} width={300} priority alt="Not Found"/>
        <h2 className='mb-4'> {message} </h2>
        { withAction && <Button onClick={handleTryAgain}> Coba lagi </Button> }
    </div>
  )
}

export default DataNotFound