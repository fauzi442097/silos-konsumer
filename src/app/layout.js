import './globals.css'
import { ThemeProvider } from './hooks/ThemeContext'
import { SidebarProvider } from './hooks/SidebarContext'
import InitialGlobalFont from '@/app/config/font'
import Layout from './layout/Layout';

export const metadata = {
  title: 'Silos Konsumer',
  description: 'Webmin Silos Konsumer - Reborn',
};

export function reportWebVitals(metric) {
  console.log(metric);
  alert('tes');
}

export default function RootLayout({ children }) {
  return (
    <>
      <InitialGlobalFont/>
      <ThemeProvider>
        <SidebarProvider>
          <html lang="en">
            <body>
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
