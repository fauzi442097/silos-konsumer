'use client'
import { Inter as fontInter } from 'next/font/google';

const Thin = fontInter({subsets: ['latin'],weight: '100'});
const ExtraLight = fontInter({subsets: ['latin'],weight: '200'});
const Light = fontInter({subsets: ['latin'],weight: '300'});
const Regular = fontInter({subsets: ['latin'],weight: '400'});
const Medium = fontInter({subsets: ['latin'],weight: '500'});
const Semibold = fontInter({subsets: ['latin'],weight: '600'});
const Bold = fontInter({subsets: ['latin'],weight: '700'});
const ExtraBold = fontInter({subsets: ['latin'], weight: '800'});

const FontInter = {
   Thin : Thin.style.fontFamily,
   ExtraLight : ExtraLight.style.fontFamily,
   Light : Light.style.fontFamily,
   Regular : Regular.style.fontFamily,
   Medium : Medium.style.fontFamily,
   Semibold : Semibold.style.fontFamily,
   Bold : Bold.style.fontFamily,
   ExtraBold : ExtraBold.style.fontFamily
}

const InitialGlobalFont = () => {
   return (
      <style jsx global>{`
          :root {
            --font-inter-thin: ${FontInter.Thin};
            --font-inter-extralight: ${FontInter.ExtraLight};
            --font-inter-light: ${FontInter.Light};
            --font-inter-regular: ${FontInter.Regular};
            --font-inter-medium: ${FontInter.Medium};
            --font-inter-semibold: ${FontInter.Semibold};
            --font-inter-bold: ${FontInter.Bold};
            --font-inter-extrabold: ${FontInter.ExtraBold};
          }
        `}</style>
   )
}

export default InitialGlobalFont