'use client'


import Button from '@/components/Button';
import Card from '@/components/Card';
import CheckboxTable from '@/components/Datatable/CheckboxTable';
import LoadingTable from '@/components/Datatable/LoadingTable';
import MyDataTable from '@/components/Datatable/MyDatatable';
import Modal from '@/components/Modal/ModalSection';
import PageTitle from '@/components/PageTitle';
import React from 'react'
import columns from './columns';
import dynamic from 'next/dynamic';
import Preloader from '@/components/Layout/Admin/Header/Preloader';
import useModal from '@/hooks/useModal';

const MyModal = dynamic(() => import('../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const Datatable = ({ data }) => {

  const {showModal, setShowModal} = useModal()

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