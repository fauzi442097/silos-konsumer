import { useState } from "react";

export default function useModal(initialState = false)  {

   const [ showModal, setShowModal ] = useState(initialState)

   return {
      showModal,
      setShowModal
   }


}