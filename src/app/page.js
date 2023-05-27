"use client"
import Layout from './components/layout/Layout'
import { SidebarProvider } from './hooks/SidebarContext'
import { ThemeProvider, useTheme } from './hooks/ThemeContext'

export default function Home() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Layout/>
      </SidebarProvider>
    </ThemeProvider>
  )
}
