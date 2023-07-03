import React from 'react'
import { createTheme, defaultThemes } from 'react-data-table-component';
import dynamic from 'next/dynamic';

import '../../../public/css/datatables-extensions.css';
import { useTheme } from '@/hooks/ThemeContext';

const DataTableExtensions = dynamic(() => import('react-data-table-component-extensions'), {ssr: false})
const DataTable = dynamic(() => import('react-data-table-component'), {ssr: false})

const ArrowDownIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 24 24'><g fill='none' fill-rule='evenodd'><path d='M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z'/><path fill='currentColor' d='M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414l-5.657 5.657Z'/></g></svg>"

createTheme('customLight', {
  background: {
     default: '#fff',
  },
  button: {
     default: "#66748c",
  },
  striped: {
     default: '#F5F7FB',
     text: '#66748c'
  },
  highlightOnHover: {
     default: '#eff9f2',
  },
  text: {
     primary: '#0c0c0F', 
  },
  selected: {
     default: '#eff9f2',
     text: '#0c0c0F'
  },
  context: {
     background: '#fef1f1',
     text: '#0c0c0F',
  },
  divider: {
     default: '#eff2f5',
  },
  action: {
     button: '#ff0d0d89',
     hover: '#e9323214',
     disabled: 'rgba(0,0,0,.12)',
  },
});

createTheme('customDark', {
  background: {
     default: 'rgb(var(--color-dark-depth1))',
  },
  button: {
     default: "#66748c",
  },
  striped: {
     default: '#F5F7FB',
     text: '#66748c'
  },
  highlightOnHover: {
     default: 'rgb(44,47,51)',
     text: 'rgb(var(--color-text-dark))'
  },
  text: {
     primary: 'rgb(var(--color-text-dark))', // bg-gray-400
     secondary: '#e3e8f0',
  },
  selected: {
     default: 'rgb(44,47,51)',
     text: 'rgb(var(--color-text-dark))'
  },
  context: {
     background: 'rgb(var(--color-dark-depth2))',
     text: 'rgb(var(--color-text-dark))',
  },
  divider: {
     default: '#eff2f51a', // color-border-dark
  },
  action: {
     button: 'var(--color-light-primary)',
     hover: 'var(--color-light-primary)',
     disabled: 'rgba(0,0,0,.12)',
  },
});

const MyDataTable = ({ columns, data, withFilter = true, compactness = false, ...props }) => {

  const { theme } = useTheme();
  const themeDataTable = theme == 'dark' ? 'customDark' : 'customLight';

  const customStyles = {
    headCells: {
      style: {
         // override the cell padding for data cells
         fontSize: '1rem',
         lineHeight: '1.25rem',
         color: '#fff',
         backgroundColor: theme == 'dark' ? 'rgb(var(--color-dark-depth2))' : 'rgb(var(--color-primary))',  // bg-dark-dept-2
         padding: '1rem',
      },
   },
   rows: {
      style: {
         '&:not(:last-of-type)': {
            borderBottomStyle: 'dashed',
            borderBottomWidth: '1px',
            borderBottomColor: defaultThemes[themeDataTable].divider.default,
         },
      },
   },
   header: {
      // Title 
      style: {
         fontSize: '1rem',
         // margin: '1rem 0',
         marginBottom: '1rem',
        padding: 0,
      },
   },
   cells: {
      style: {
         padding: '1rem 1.25rem', // override the cell padding for data cells
         fontSize: '0.875rem',
         wordBreak: 'break-word',
      },
   },
   contextMenu: {
      style: {
         backgroundColor: defaultThemes[themeDataTable].context.background,
         color: defaultThemes[themeDataTable].context.text,
         borderRadius: '0.75rem', // rounded-md
         padding: '1rem 1.5rem',
         transform: 'translate3d(0, -100%, 0)',
         transitionDuration: '125ms',
         transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
         willChange: 'transform',
         border: theme == 'dark' ? '1px solid rgb(var(--color-dark-depth2))' : '1px solid #dc1c21'
      },
      activeStyle: {
         transform: 'translate3d(0, 0, 0)',
      },
   },
   pagination: {
      style: {
         color: defaultThemes[themeDataTable].text.primary,
         fontSize: '0.875rem', // text-sm
         lineHeight: '1.25rem',
         minHeight: '56px',
         borderTopStyle: 'solid',
         borderTopWidth: '1px',
         borderTopColor: defaultThemes[themeDataTable].divider.default
      },
      pageButtonsStyle: {
         borderRadius: '0.375rem',
         height: '40px',
         width: '40px',
         padding: '8px',
         margin: 'px',
         cursor: 'pointer',
         fill: defaultThemes[themeDataTable].text.primary,
         transition: '0.4s',
         backgroundColor: 'transparent',
         '&:disabled': {
            cursor: 'not-allowed',
            fill: defaultThemes[themeDataTable].text.primary,
            opacity: '.2'
         },
         '&:hover:not(:disabled)': {
            background: (themeDataTable == 'customLight') ? 'rgb(var(--color-primary))' : 'var(--color-light-primary)',
            fill: (themeDataTable == 'customLight') ? '#fff' : 'rgb(var(--color-primary))',
            borderRadius: '0.375rem',
         },
         '&:focus': {
            outline: 'none',
            backgroundColor: (themeDataTable == 'customLight') ? 'rgb(var(--color-primary))' : 'var(--color-light-primary)',
            fill: (themeDataTable == 'customLight') ? '#fff': 'rgb(var(--color-primary))'
         },
      },
   },
  }

  return (
   <div className='relative'>
      {
         withFilter ? (
            <DataTableExtensions
               columns={columns}
               data={data}
               print={false}
               export={false}
               filterPlaceholder={'Cari Data'}
            >
               <DataTable
                  dense={compactness}
                  theme={theme == 'dark' ? 'customDark' : 'customLight'}
                  customStyles={customStyles}
                  paginationServer={false}
                  pagination={true}
                  defaultSortAsc={false}
                  defaultSortFieldId={1}
                  sortIcon={<span dangerouslySetInnerHTML={{ __html: ArrowDownIcon }} />}
                  striped={false}
                  highlightOnHover={true}
                  pointerOnHover={false}
                  persistTableHead={true}
                  selectableRowsHighlight={true}
                  noDataComponent={"Data tidak tersedia"}
                  {...props}
                  />
            </DataTableExtensions>
         ) : (
            <DataTable
               dense={compactness}
               columns={columns}
               data={data}
               theme={theme == 'dark' ? 'customDark' : 'customLight'}
               customStyles={customStyles}
               paginationServer={false}
               pagination={true}
               defaultSortAsc={false}
               defaultSortFieldId={1}
               sortIcon={<span dangerouslySetInnerHTML={{ __html: ArrowDownIcon }} />}
               striped={false}
               highlightOnHover={true}
               pointerOnHover={false}
               persistTableHead={true}
               selectableRowsHighlight={true}
               noDataComponent={"Data tidak tersedia"}
               {...props}
               />
         )
      }
    </div>
  )
}

export default MyDataTable