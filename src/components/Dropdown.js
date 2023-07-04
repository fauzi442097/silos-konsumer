import React, { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { cn } from '@/lib/utils'

const DropdownItem = ({ children, ...props }) => {
    return <div className="dropdown-item" {...props}> {children} </div>
}

function DropdownFunc({
  placement = "right",
  offset = { horizontal: 0, vertical: 0 },
  children
}) {

  const [visible, setVisibility] = useState(false);
  const referenceRef = useRef(null);
  const popperRef = useRef(null);
  const { horizontal, vertical } = offset;

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement,
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
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (event) => {
    if (referenceRef.current.contains(event.target)) return;
    setVisibility(false);
  }

  function handleDropdownClick(event) {
    setVisibility(!visible);
  }

  console.log(visible)

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
            style={styles.offset} 
            visible={visible} 
            className={cn([
                'w-full bg-white rounded-lg max-h-[200px] overflow-y-auto bg-white py-2 dark:bg-dark-depth3 min-w-max',
                visible ? 'flex flex-col' : 'hidden'
            ])}>
            {children && children.map((child,i) => <DropdownItem key={i}>{child}</DropdownItem>)}
        </div>
      </div>
    </>
  );
}

// const DropdownContainer = styled.div`
//   display: ${props => (props.visible ? "flex" : "none")};
//   width: "2px";
//   flex-direction: column;
//   background-color: "#FFF";
//   border-radius: 4px;
//   box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.14);
//   padding: 5px;
//   background: white;
// `;

const DropdownContainer = styled.div`
  display: ${props => (props.visible ? "flex" : "none")};
  width: 100%;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.14);
  padding: 5px;
`;

// const DropdownItem = styled.div`
//   justify-content: flex-start;
//   height: 40px;
//   padding-right: 10px;
//   padding-left: 10px;
//   align-items: center;
//   &:hover {
//     background-color: #00ffff;
//   }
//   &:active {
//     font-weight: 700;
//     color: #00ffff;
//   }
// `;

// export default DropdownFunc;


// import React, { FC, useState, useRef, useEffect } from "react";
// import styled from "styled-components";
// import { usePopper } from "react-popper";
// import { Placement } from "@popperjs/core";


// const DropdownContainer = styled.div`
//   display: ${({ open }) => (open ? "flex" : "none")};
//   width: 100%;
//   flex-direction: column;
//   background-color: #fff;
//   border-radius: 5px;
//   box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.14);
//   padding: 5px;
// `;

// const DropdownItem = styled.div`
//   justify-content: flex-start;
//   height: 40px;
//   padding-right: 10px;
//   padding-left: 10px;
//   align-items: center;
//   &:hover {
//     background-color: #00ffff;
//   }
//   &:active {
//     font-weight: 700;
//     color: #00ffff;
//   }
// `;

// const DropDownTrigger = styled.button`
//   border: none;
//   background: none;
//   font-size: 16px;
//   font-family: inherit;
// `;

// const DefaultTitle = () => {
//   return <div>What</div>;
// };

// const DropdownFunc = ({
//   titleElement: TitleElement = <DefaultTitle />,
//   placement = "bottom",
//   offset = { horizontal: 0, vertical: 0 },
//   children
// }) => {

//     const [visible, setVisibility] = useState(false);
//   const [open, setOpen] = useState(false);
//   const popperRef = useRef(null);

//   const toggle = () => setOpen(!open);
// //   const handleDropdownClick = (e) => {
// //     e.preventDefault();
// //     toggle();
// //   }


// const referenceRef = useRef(null);

//   const { horizontal, vertical } = offset;
//   const { styles, attributes } = usePopper(
//     referenceRef.current,
//     popperRef.current,
//     {
//       placement,
//       modifiers: [
//         {
//           name: "offset",
//           enabled: true,
//           options: {
//             offset: [horizontal, vertical]
//           }
//         }
//       ]
//     }
//   );

//     useEffect(() => {
//         document.addEventListener("mousedown", handleDocumentClick);
//         return () => {
//             document.removeEventListener("mousedown", handleDocumentClick);
//         };
//     }, []);

//     function handleDocumentClick(event) {
//         if (referenceRef.current.contains(event.target)) {
//         return;
//         }
//         setVisibility(false);
//     }

//     function handleDropdownClick(event) {
//         setVisibility(!visible);
//     }


//   return (
//     <>
      
//         <DropDownTrigger
//           type="button"
//           className="relative z-5 block p-2 text-gray-700 bg-white border rounded-md  focus:ring-primary focus:ring-1 dark:border-[#5a5b5e] dark:bg-transparent dark:focus:ring-primary-800 focus:outline-none group"
//           ref={referenceRef}
//           onClick={handleDropdownClick}
//         >
//           <svg className="w-6 h-6 group-focus:text-primary dark:text-grey dark:group:focus:text-primary-800" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
//         </DropDownTrigger>
    
//       <div ref={popperRef} style={styles.popper} {...attributes.popper} className="bg-white z-50">
//         <DropdownContainer style={styles.offset} visible={visible}>
//           {children &&
//             React.Children.map(children, (child) => {
//               return <DropdownItem>{child}</DropdownItem>;
//             })}
//         </DropdownContainer>
//       </div>
//     </>
//   );
// };

// function useHandleClickOutside(callback) {
//     const ref = useRef(null);
//     useEffect(() => {
//       const handleClickOutside = (event) => {
//         if (
//           ref.current &&
//           !ref.current.contains(event.target)
//         ) {
//           callback.apply(null, [false]);
//         }
//       };
  
//       document.addEventListener("click", handleClickOutside, true);
//       return () => {
//         document.removeEventListener("click", handleClickOutside, true);
//       };
//     }, [callback]);
//     return { ref };
// }

export default DropdownFunc;
