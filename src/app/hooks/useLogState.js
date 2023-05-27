import { useEffect } from "react";

export default function useLogState(value) {
   useEffect(() => {
      console.log(value);
   }, [value])
}