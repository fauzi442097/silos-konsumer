"use client"

const { useEffect, useState, useCallback } = require("react")

export const useLocalStorage = (key, value) => {
   let ls;
   if (typeof window !== "undefined") ls = window.localStorage;
   return useStorage(key, value, ls)
}

const useStorage = (key, defaultValue, storageObject) => {
   const [value, setValue] = useState(() => {
      const jsonValue = storageObject === undefined ? undefined : storageObject.getItem(key)
      if ( jsonValue != undefined || jsonValue != null) {
         return JSON.parse(jsonValue)
      }

      if ( typeof initialValue === 'function') {
         return defaultValue()
      } else {
         return defaultValue
      }
   });

   useEffect(() => {
      if ( value === undefined) return storageObject.removeItem(key)
      storageObject.setItem(key, JSON.stringify(value))
   }, [key, value, storageObject])

   const remove = useCallback(() => {
      return setValue(undefined)
   }, [])

   return [ value, setValue, remove]
}