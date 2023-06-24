import _ from 'lodash';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React from 'react'

const Crumb = ({ text, href, last = false }) => {
    if (last) {
       return <li className="text-muted cursor-default">{text}</li>
    }
  
    return (
       <>
          <li className="group">
            <Link href={href} className="dark:text-grey group-hover:text-primary dark:group-hover:text-green-600 text-[#6E727D]">{text}</Link> 
          </li>
          <li>
            <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path className="text-[#6E727D]" fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
         </li>
       </>
    );
 }


const generatePathParts = pathStr => {
   return pathStr.split("/").filter(v => v.length > 0);
}

const Breadcrumbs = () => {
    const pathname = usePathname()

    const breadcrumbs = React.useMemo(function generateBreadcrumbs() {
       const asPathNestedRoutes = generatePathParts(pathname);
       const crumblist = asPathNestedRoutes.map((subpath, idx) => {
          const href = "/" + subpath;
          const text = _.capitalize(subpath);
          return { href, text }; 
       })

       return [{ href: "/", text: "Home" }, ...crumblist];
    }, [pathname]);  
       
   return (
       <nav className="flex mb-5" aria-label="Breadcrumb">
         <ol className="inline-flex items-center gap-2">
            {
               breadcrumbs.map((crumb, idx) => (
                  <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
               ))
            }
          </ol>
       </nav>
    );
}

export default Breadcrumbs