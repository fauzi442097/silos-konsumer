export const columns = [
    {
        name: 'ID',
        selector: (row) => row.id,
        sortable: true,
        center: true,
        wrap: false,
    },
    {
        name: 'Title',
        selector: (row) => row.title,
        cellExport: row => row.title,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'Brand',
        selector: (row) => row.brand,
        cellExport: row => row.brand,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'Price',
        selector: (row) => row.price,
        cellExport: row => row.price,
        sortable: true,
        right: true,
        wrap: true,
    },
    {
        name: 'Rating',
        selector: (row) => row.rating,
        cellExport: row => row.rating,
        sortable: true,
        right: true,
        wrap: false,
    },
    {
        name: 'Category',
        selector: (row) => row.category,
        cellExport: row => row.category,
        sortable: true,
        center: false,
        wrap: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      cellExport: row => row.description,
      sortable: true,
      wrap: false,
      grow: 5
  },
]