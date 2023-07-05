import React, { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import { cn } from '@/lib/utils'
import Link from "next/link";

export const DropdownItem = ({ className, href, children, ...props }) => {
    return <Link href={href} className={cn(['dropdown-item', className])} {...props}> {children} </Link>
}

const Dropdown = ({ 
  position = "right-start",
  offset = { horizontal: 10, vertical: 10 },
  children
}) => {

  const [visible, setVisibility] = useState(false);
  const referenceRef = useRef(null);
  const popperRef = useRef(null);
  const { horizontal, vertical } = offset;

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement : position,
      modifiers: [
        {
          name: "offset",
          enabled: true,
          options: {
            offset: [horizontal, vertical]
          }
        }
      ]
    }
  );

  useEffect(() => {
    // listen for clicks and close dropdown on body
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (event) => {
    if (referenceRef.current?.contains(event.target)) return;
    setVisibility(false);
  }

  const handleDropdownClick = (event) => {
    setVisibility(!visible);
  }


  return (
    <>
      <button 
        className="relative z-5 block p-2 text-gray-700 bg-white border rounded-md  focus:ring-primary focus:ring-1 dark:border-[#5a5b5e] dark:bg-transparent dark:focus:ring-primary-800 focus:outline-none group"
        ref={referenceRef} 
        onClick={handleDropdownClick}>
        <svg className="w-6 h-6 group-focus:text-primary dark:text-grey dark:group:focus:text-primary-800" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
      </button>
      <div ref={popperRef} style={styles.popper} {...attributes.popper} className="z-50">
        <div 
            // style={styles.offset} 
            style={{ 
              boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
             }} 
            className={cn([
                'w-full rounded-lg  bg-white py-2 dark:bg-dark-depth3 min-w-max',
                visible ? 'flex flex-col' : 'hidden'
            ])}>
            {children && children.map((child,i) => <React.Fragment key={i}> {child}</React.Fragment>)}
        </div>
      </div>
    </>
  );
}

export default Dropdown;
