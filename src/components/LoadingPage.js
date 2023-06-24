import React from 'react'
import NextTopLoader from 'nextjs-toploader';

const LoadingPage = () => {
   return (
      <NextTopLoader
         color={'#E72129'}
         initialPosition={0.01}
         crawlSpeed={200}
         height={3}
         crawl={true}
         showSpinner={true}
         easing="ease"
         speed={200}
      />
  )
}

export default LoadingPage