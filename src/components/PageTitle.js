import React from 'react'
import Breadcrumbs from './Breadcrumbs'

const PageTitle = ({ title, pageAction }) => {
  return (
    <div className='flex flex-row justify-between items-center flex-wrap'>
      <div>
        <h1> {title} </h1>
        {/* <Breadcrumbs/> */}
      </div>
      
      <div>
        {pageAction}
      </div>
    </div>
  )
}

export default PageTitle