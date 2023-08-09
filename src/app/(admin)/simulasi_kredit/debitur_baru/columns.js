import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { formatRupiah } from "@/lib/utils";

export const columns = [
    {
        name: 'ID',
        selector: (row) => row.id,
        sortable: true,
        center: true,
        wrap: true,
        omit: true
    },
    {
        name: 'Angsuran Ke',
        selector: (row) => row.nmProspek,
        cellExport: row => row.nmProspek,
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Sisa Pokok',
        selector: (row) => row.noIdentitas,
        cellExport: row => row.noIdentitas,
        sortable: true,
        center: false,
        wrap: true
    },
    {
        name: 'Angsuran Pokok',
        selector: (row) => row.productName,
        cellExport: row => row.productName,
        sortable: true,
        center: false,
        wrap: true
    },
    {
        name: 'Angsuran Bunga',
        selector: (row) => formatRupiah(row.plafon),
        cellExport: row => row.plafon,
        sortable: true,
        right: true,
        wrap: true
    },
    {
        name: 'Angsuran',
        selector: (row) => formatRupiah(row.totalAngsuran),
        cellExport: row => row.totalAngsuran,
        sortable: true,
        right: true,
        wrap: true
    }
];