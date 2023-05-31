'use client'
import React from "react"

import DataTable, { createTheme } from 'react-data-table-component';
import styled, { keyframes } from 'styled-components';
import DropdownButton from "../DropdownButton";


const MyDatatable = () => {
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  const Spinner = styled.div`
	margin: 16px;
	transform: translateZ(0);
	border-top: 2px solid grey;
	border-right: 2px solid grey;
	border-bottom: 2px solid grey;
	border-left: 4px solid black;
	background: transparent;
	width: 80px;
	height: 80px;
	border-radius: 50%;
`;

  const customStyles = {
    headRow: {
      style: {
        border: 'none',
      },
    },
    headCells: {
      style: {
        color: '#202124',
        fontSize: '14px',
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: 'rgb(230, 244, 244)',
        borderBottomColor: '#FFFFFF',
        borderRadius: '25px',
        outline: '1px solid #FFFFFF',
      },
    },
    pagination: {
      style: {
        border: 'none',
      },
    },
  };

  const CustomLoader = () => (
    <div style={{ padding: '24px' }}>
      <Spinner />
      <div>Fancy Loader...</div>
    </div>
  );

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
      grow: 2,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'Owner',
      selector: row => row.by,
      sortable: true,
      style: {
        color: 'rgba(0,0,0,.54)',
      },
    },
    {
      name: 'Last opened',
      selector: row => row.lastOpened,
      sortable: true,
      style: {
        color: 'rgba(0,0,0,.54)',
      },
    },
    {
      cell: row => <DropdownButton row={row} />,
      allowOverflow: true,
      button: true,
      width: '56px',
    },
  ];

  const data = [
    {
      id: 1,
      title: 'Cutting Costs',
      by: 'me',
      lastOpened: 'Aug 7 9:52 AM',
    },
    {
      id: 2,
      title: 'Wedding Planner',
      by: 'me',
      lastOpened: 'Sept 14 2:52 PM',
    },
    {
      id: 3,
      title: 'Expense Tracker',
      by: 'me',
      lastOpened: 'Sept 14 2:52 PM',
    },
    {
      id: 4,
      title: 'Home Brew Water Calculator',
      by: 'me',
      lastOpened: 'Jube 3 5:45 PM',
    },
  ];

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(data);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="position-relative">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        progressPending={pending}
        progressComponent={<CustomLoader />}
        pagination
      />
    </div>
  )
}

export default MyDatatable
