import Layout from './components/layout/Layout'
import './globals.css'
import { ThemeProvider } from './hooks/ThemeContext'
import { SidebarProvider } from './hooks/SidebarContext'
import InitialGlobalFont from '@/app/config/font'
import NextTopLoader from 'nextjs-toploader';

export const metadata = {
  title: 'Silos Konsumer',
  description: 'Webmin Silos Konsumer - Reborn',
};



export default function RootLayout({ children }) {
  return (
    <>
      <InitialGlobalFont/>
      <ThemeProvider>
        <SidebarProvider>
          <html lang="en">
            <body>
              <NextTopLoader 
                  color="#009A4B"
                  initialPosition={0.01}
                  crawlSpeed={200}
                  height={3}
                  crawl={true}
                  showSpinner={true}
                  easing="ease"
                  speed={200}
                  shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              />
              <Layout>
                {children}
              </Layout>
            </body>
          </html>
        </SidebarProvider>
      </ThemeProvider>
    </>
  )
}
