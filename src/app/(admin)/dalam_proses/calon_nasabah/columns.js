import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { formatRupiah } from "@/lib/utils";
import Badge from "@/components/Badge";

const DropdownAction = () => {
    return (
        <Dropdown>
            <DropdownItem href="#">Simulasi Calon Nasabah</DropdownItem>
            <DropdownItem href="#">Ubah Data</DropdownItem>
        </Dropdown>
    )
}

const workflowStatus = (row) => {
    let workflowStatus = '';

    if (row.bicheck){
        if(row.bicheck.biCheckStatusId){
            workflowStatus = <Badge variant={'success'}>Completed</Badge>
        } else {
            if(row.bicheck.document.length > 0){
                workflowStatus = <Badge variant={'warning'}>Uploaded</Badge>
            } else {
                workflowStatus = <Badge variant={'light'}>Progress Slik</Badge>
            }
        }
    } else {
        workflowStatus = <Badge variant={'success'}>SlikChecking</Badge>
    }

    return (
        workflowStatus
    )
}

const hasilAnalisa = (row) => {
    let statusNasabah = '';

    if(row.scoringRange && row.scoringRange.isLayak){
        statusNasabah = <Badge variant={'success'}>Layak</Badge>
    } else {
        statusNasabah = <Badge variant={'danger'}>Tidak Layak</Badge>
    }

    return (
        statusNasabah
    )
}

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
        name: 'Aksi',
        cell: (row, index, column, id) => <DropdownAction/>,
        ignoreRowClick: false,
        allowOverflow: true,
        button: true,
    },
    {
        name: 'Jenis Nasabah',
        selector: (row) => row.idChannel === 2 ? <Badge variant={'light'}>SIP</Badge> : <Badge variant={'success'}>Calon Nasabah</Badge>,
        cellExport: row => row.idChannel,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'Nama Nasabah',
        selector: (row) => row.nasabah.namaNasabah,
        cellExport: row => row.nasabah.namaNasabah,
        sortable: true,
        center: false,
        wrap: true,
        grow: 3
    },
    {
        name: 'Produk',
        selector: (row) => row.product.prodName,
        cellExport: row => row.product.prodName,
        sortable: true,
        center: false,
        wrap: true,
        grow: 4
    },
    {
        name: 'Cabang',
        selector: (row) => row.branch.branchName,
        cellExport: row => row.branch.branchName,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'Plafon',
        selector: (row) => formatRupiah(row.plafon),
        cellExport: row => formatRupiah(row.plafon),
        sortable: true,
        center: false,
        wrap: true,
        grow: 1
    },
    {
        name: 'Jangka Waktu',
        selector: (row) => row.jangkaWaktu,
        cellExport: row => row.jangkaWaktu,
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Angsuran Normal',
        selector: (row) => row.promo ? formatRupiah(row.promo.angsuranNormal) : formatRupiah(row.totalAngsuran),
        cellExport: row => row.promo ? formatRupiah(row.promo.angsuranNormal) : formatRupiah(row.totalAngsuran),
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Angsuran Promo',
        selector: (row) => row.promo ? formatRupiah(row.promo.angsuranPromo) : formatRupiah(0),
        cellExport: row => row.promo ? formatRupiah(row.promo.angsuranPromo) : formatRupiah(0),
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Status',
        selector: (row) => workflowStatus(row),
        cellExport: row => row.id,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'Hasil Analisa',
        selector: (row) => hasilAnalisa(row),
        cellExport: row => row.id,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
]