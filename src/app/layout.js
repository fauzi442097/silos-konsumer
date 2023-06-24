import './globals.css'
import { ThemeProvider } from '@/hooks/ThemeContext';
import { SidebarProvider } from '@/hooks/SidebarContext';
import InitialGlobalFont from '@/config/font';
import Layout from '@/components/Layout/Layout';

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
            <Layout>
              {children}
            </Layout>
        </SidebarProvider>
      </ThemeProvider>
    </>
  )
}
