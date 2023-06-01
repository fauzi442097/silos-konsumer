"use client"

const { useEffect, useState, useCallback } = require("react")

export const useLocalStorage = (key, value) => {
   return useStorage(key, value, window.localStorage)
}

const useStorage = (key, defaultValue, storageObject) => {
   const [value, setValue] = useState(() => {
      const jsonValue = storageObject.getItem(key)
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