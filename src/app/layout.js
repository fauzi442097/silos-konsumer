import Layout from './components/layout/Layout'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './hooks/ThemeContext'
import { SidebarProvider } from './hooks/SidebarContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <html lang="en">
          <body className={inter.className}>
            <Layout>
              {children}
            </Layout>
          </body>
        </html>
      </SidebarProvider>
    </ThemeProvider>
  )
}
