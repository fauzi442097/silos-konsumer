'use client'

import React from 'react'
import FormSelect from './select'
import FormInput from './input'
import FormModal from './modal'
import FormButton from './button'
import FormBadge from './badge'
import PageTitle from '@/components/PageTitle'
import Card from '@/components/Card'

const Page = () => {

  return (
    <>
        <PageTitle title='Form'/>
        <Card>
            <Card.Body>
              <FormButton/>
              <FormBadge/>
              <FormModal/>
              <FormInput/>
              <FormSelect/>
            </Card.Body>
        </Card>
    </>
  )
}

export default Page