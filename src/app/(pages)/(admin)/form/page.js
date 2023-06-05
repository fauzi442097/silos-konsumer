'use client'

import React from 'react'
import Card from '@/app/components/Card'
import PageTitle from '@/app/components/PageTitle'
import FormSelect from './select'
import FormInput from './input'
import FormModal from './modal'
import FormButton from './button'
import FormBadge from './badge'


const FormsPage = () => {

  return (
    <>
        <PageTitle title='Form'/>
        <Card>
            <FormButton/>
            <FormBadge/>
            <FormModal/>
            <FormInput/>
            <FormSelect/>
        </Card>
        
    </>
  )
}

export default FormsPage