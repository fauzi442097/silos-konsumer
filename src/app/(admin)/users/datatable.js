'use client'


import Button from '@/components/Button';
import Card from '@/components/Card';
import CheckboxTable from '@/components/Datatable/CheckboxTable';
import LoadingTable from '@/components/Datatable/LoadingTable';
import MyDataTable from '@/components/Datatable/MyDatatable';
import Preloader from '@/components/Layout/Admin/Header/Preloader';
import Modal from '@/components/Modal/ModalSection';
import PageTitle from '@/components/PageTitle';
import useModal from '@/hooks/useModal';
import dynamic from 'next/dynamic';

const MyModal = dynamic(() => import('../../../components/Modal'), {ssr: false, loading: () => <Preloader type={'toggleSidebar'}/>})

const Datatable = ({ data }) => {
    const columns = [
        {
            name: 'Id',
            selector: (row) => row.id,
            cellExport: row => row.id,
            sortable: true,
            center: false,
        },
        {
            name: 'First Name',
            selector: (row) => row.firstName,
            cellExport: row => row.firstName,
            sortable: true,
            center: false
        },
        {
            name: 'Last Name',
            selector: (row) => row.lastName,
            cellExport: row => row.lastName,
            sortable: true,
            center: false
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            cellExport: row => row.email,
            sortable: true,
            center: false
        },
        {
            name: 'Age',
            selector: (row) => row.age,
            cellExport: row => row.age,
            sortable: true,
            center: false
        },
        {
            name: 'Gender',
            selector: (row) => row.gender,
            cellExport: row => row.gender,
            sortable: true,
            center: false
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
            cellExport: row => row.phone,
            sortable: true,
            center: false
        },
        {
            name: 'Birth Date',
            selector: (row) => row.birthDate,
            cellExport: row => row.birthDate,
            sortable: true,
            center: true
        },
        {
            name: 'Action',
            cell: (row, index, column, id) => <Button.Primary className="btn-sm" onClick={() => router.push(`/users/${row.id}`)}> Detail </Button.Primary>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
      ];

   const { showModal, setShowModal } = useModal();
      
  return (
    <>
        <PageTitle title='Users'/>
        <Card>
            <div className='flex justify-between items-center mb-8'>
                <h3> Users </h3>
                <Button.Primary onClick={() => setShowModal(true)}> Tambah Data </Button.Primary>
            </div>

            {showModal && (
							<MyModal closeOutside={true} setShowModal={setShowModal}>
								<Modal.Header>
									<Modal.Title title="Tambah Data" subTitle={'Tambah data pegawai'}/>
									<Button.CloseModal onClick={() => setShowModal(false)}/>
								</Modal.Header>
								<Modal.Body>
									Lorem ipsum dolor sit amet consectetur adipisicing
									elit. Illum quisquam vero quo enim corporis eligendi
									fuga porro, qui consequuntur quasi illo ea minima
									placeat molestiae cupiditate doloribus est nostrum
									sunt repellat perferendis! Modi impedit deserunt
									voluptas qui iste ducimus, nemo repellendus tempora
									neque excepturi, totam quo ut eveniet minima sunt
									quam, a esse velit sapiente nostrum libero? Ad est
									doloribus sunt officia et ab labore earum accusamus
									sint deleniti, eaque accusantium aperiam aliquid
									consequuntur mollitia esse incidunt dolor consectetur
									sit magnam ipsum? Quaerat culpa fuga, quia quibusdam
									minima a est consequatur autem deleniti harum illo
									rerum debitis. Consequuntur, tenetur laborum?
								</Modal.Body>
								<Modal.Footer>
                  <Button.Clean> Batal </Button.Clean>
									<Button.Primary> Simpan </Button.Primary>
								</Modal.Footer>
							</MyModal>
						)}
            

            <MyDataTable
                compactness={true}
                fixedHeader={true}
                withFilter={false}
                // fixedHeaderScrollHeight="500px"
                columns={columns}
                data={data}
                selectableRows={false}
                pagination={true}
                paginationPerPage={10}
                responsive={true}
                progressPending={false}
                selectableRowsComponent={CheckboxTable}
                progressComponent={<LoadingTable/>}
                contextActions={<Button.LightPrimary onClick={() => alert('on progress')}>Hapus</Button.LightPrimary>}
            />
        </Card>
    </>
  )
}

export default Datatable