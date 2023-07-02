'use client'
import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import dynamic from 'next/dynamic';
import Modal from '@/components/Modal/ModalSection';
import Preloader from '@/components/Layout/Admin/Header/Preloader';
import Button, { ButtonCloseModal } from '@/components/Button';


const MyModal = dynamic(() => import('../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })


const FormModal = () => {
	const [showModal, setShowModal] = useState({
		base: false,
		sm: false,
		lg: false,
		xl: false,
		fullScreen: false,
	});

	const showModalDialog = (type) => {
		setShowModal((prev) => ({ ...prev, [type]: true }))
	}

	return (
		<>

			<div className='mt-3 flex gap-2'>
				<Button onClick={() => showModalDialog('base')}> Modal Default </Button>
				<Button onClick={() => showModalDialog('sm')}> Modal Small </Button>
				<Button onClick={() => showModalDialog('lg')}> Modal Large </Button>
				<Button onClick={() => showModalDialog('xl')}> Modal XL </Button>
				<Button onClick={() => showModalDialog('fullScreen')}> Modal Fullscreen </Button>
			</div>

			<AnimatePresence>
				{showModal.base && (
					<MyModal closeOutside={true} setShowModal={setShowModal}>
						<Modal.Header>
							<Modal.Title title="Tambah Data" subTitle={'Tambah data pegawai'} />
							<ButtonCloseModal onClick={() =>
								setShowModal((prev) => ({
									...prev,
									base: false,
								}))
							} />
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
							<Button variant={'clean'}> Batal </Button>
							<Button> Simpan </Button>
						</Modal.Footer>
					</MyModal>
				)}

				{showModal.sm && (
					<MyModal size='sm' closeOutside={true} setShowModal={setShowModal}>
						<Modal.Header>
							<div>
								<h3 className='font-bold mb-1'> Tambah Data </h3>
								<span> Tambah data pegawai </span>
							</div>
							<ButtonCloseModal onClick={() =>
								setShowModal((prev) => ({
									...prev,
									sm: false,
								}))
							} />
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
							<Button variant={'clean'}> Batal </Button>
							<Button> Simpan </Button>
						</Modal.Footer>
					</MyModal>
				)}

				{showModal.lg && (
					<MyModal size='lg'closeOutside={true} setShowModal={setShowModal}>
						<Modal.Header>
							<div>
								<h3 className='font-bold mb-1'> Tambah Data </h3>
								<span> Tambah data pegawai </span>
							</div>
							<ButtonCloseModal onClick={() =>
								setShowModal((prev) => ({
									...prev,
									lg: false,
								}))
							} />
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
							<Button variant={'clean'}> Batal </Button>
							<Button> Simpan </Button>
						</Modal.Footer>
					</MyModal>
				)}

				{showModal.xl && (
					<MyModal size='xl' closeOutside={true} setShowModal={setShowModal}>
						<Modal.Header>
							<div>
								<h3 className='font-bold mb-1'> Tambah Data </h3>
								<span> Tambah data pegawai </span>
							</div>
							<ButtonCloseModal onClick={() =>
								setShowModal((prev) => ({
									...prev,
									xl: false,
								}))
							} />
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
							<Button variant={'clean'}> Batal </Button>
							<Button> Simpan </Button>
						</Modal.Footer>
					</MyModal>
				)}

				{showModal.fullScreen && (
					<MyModal size='fullscreen' closeOutside={true} setShowModal={setShowModal}>
						<Modal.Header>
							<div>
								<h3 className='font-bold mb-1'> Tambah Data </h3>
								<span> Tambah data pegawai </span>
							</div>
							<ButtonCloseModal onClick={() =>
								setShowModal((prev) => ({
									...prev,
									fullScreen: false,
								}))
							} />
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
							<Button variant={'clean'}> Batal </Button>
							<Button> Simpan </Button>
						</Modal.Footer>
					</MyModal>
				)}


			</AnimatePresence>
			<br />

		</>
	)
}

export default FormModal
