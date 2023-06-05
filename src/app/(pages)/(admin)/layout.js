import AdminLayout from '@/app/layout/Admin/AdminLayout'
import React from 'react'

const layout = ({ children }) => {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  )
}

export default layout