'use client'

import React, { useContext} from 'react'
import { useLocalStorage } from './useStorage';

const ThemeContext = React.createContext({});

export const useTheme = () => {
   return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
   const [ darkTheme, setDarkTheme ] = useLocalStorage('theme', 'light')
   
   const toggleTheme = (theme) => {
      setDarkTheme(theme)
   }

   return (
      <ThemeContext.Provider value={{
         theme : darkTheme,
         setTheme : toggleTheme
      }}>
         {children}
      </ThemeContext.Provider>
   )

}