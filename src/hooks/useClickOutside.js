'use client';
import React, {useRef, useEffect} from "react";

export const useClickOutside = (handler, btnRef) => {
    const domNode = useRef();
    useEffect(() => {
       let handleClick = (e) => {  
            if ( !domNode.current.contains(e.target) && !btnRef.current.contains(e.target)) {
                handler();
            }
       }
       document.addEventListener('click', handleClick);
       return () => { document.removeEventListener('click', handleClick);}
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    return domNode;
 }