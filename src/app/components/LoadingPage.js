import React from 'react'
import NextTopLoader from 'nextjs-toploader';
import { useTheme } from '../hooks/ThemeContext';

const LoadingPage = () => {
   const { theme } = useTheme();
   const loadingPageColor = theme == 'dark' ? '#FFF' : '#009A4B'
   return (
      <NextTopLoader
         color={loadingPageColor}
         initialPosition={0.01}
         crawlSpeed={200}
         height={3}
         crawl={true}
         showSpinner={true}
         easing="ease"
         speed={200}
         shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
  )
}

export default LoadingPage