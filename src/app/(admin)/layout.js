import AdminLayout from '@/components/Layout/Admin/AdminLayout'
import React from 'react'

const Layout = ({ children }) => {
  return (
      <AdminLayout>
        {children}
      </AdminLayout>
  )
}

export default Layout