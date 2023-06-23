import React from 'react'
import Breadcrumbs from './Breadcrumbs'

const PageTitle = ({ title }) => {
  return (
    <>
      <h1> {title} </h1>
      <Breadcrumbs/>
    </>
  )
}

export default PageTitle