import { useTheme } from '@/app/hooks/ThemeContext';
import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md';
import { createTheme, defaultThemes } from 'react-data-table-component';
import dynamic from 'next/dynamic';

import '../../../../public/css/datatables-extensions.css';

const DataTableExtensions = dynamic(() => import('react-data-table-component-extensions'), {ssr: false})
const DataTable = dynamic(() => import('react-data-table-component'), {ssr: false})

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
         fontSize: ' 0.875rem',
         lineHeight: '1.25rem',
         color: '#fff',
         backgroundColor: theme == 'dark' ? 'rgb(var(--color-dark-depth2))' : 'rgb(var(--color-primary))',  // bg-dark-dept-2
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
         wordBreak: 'break-word'
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
                  sortIcon={<MdKeyboardArrowDown />}
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
               sortIcon={<MdKeyboardArrowDown />}
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