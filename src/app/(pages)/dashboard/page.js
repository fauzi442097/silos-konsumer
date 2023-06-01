'use client'

import React, { useState } from 'react'
import Badge from '@/app/components/Badge'
import Button from '@/app/components/Button'
import Card from '@/app/components/Card'
import Layout from '@/app/components/layout/Layout'
import { FiSave } from 'react-icons/fi'
import { AnimatePresence } from 'framer-motion'
import Modal from '@/app/components/Modal'
import PageTitle from '@/app/components/PageTitle'


const Dashboard = () => {

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
	 

        <PageTitle title='Dashboard'/>
        <Card>
          <div className='flex gap-2'>
            <Button.Primary> Simpan </Button.Primary>
            <Button.LightPrimary> Simpan </Button.LightPrimary>
            <Button.OutlinePrimary> Simpan </Button.OutlinePrimary>
            <Button.Icon className="btn-primary"> <FiSave className='text-lg'/> </Button.Icon>
            <Button.Secondary> Simpan </Button.Secondary>
            <Button.LightPrimary> Simpan </Button.LightPrimary>
          </div>
          
          <div className='mt-3 flex gap-4'>
            <Badge.Success> Active </Badge.Success>
            <Badge.Warning> Probation </Badge.Warning>
            <Badge.Danger> Non Aktif </Badge.Danger>
            <Badge.Light> Default </Badge.Light>
          </div>

          <div className='mt-3 flex gap-2'>
            <Button.Primary onClick={() => showModalDialog('base')}> Modal Default </Button.Primary>
            <Button.Primary onClick={() => showModalDialog('sm')}> Modal Small </Button.Primary>
            <Button.Primary onClick={() => showModalDialog('lg')}> Modal Large </Button.Primary>
            <Button.Primary onClick={() => showModalDialog('xl')}> Modal XL </Button.Primary>
            <Button.Primary onClick={() => showModalDialog('fullScreen')}> Modal Fullscreen </Button.Primary>
          </div>

          <AnimatePresence>
						{showModal.base && (
							<Modal closeOutside={true} setShowModal={setShowModal}>
								<Modal.Header>
                  <Modal.Title title="Tambah Data" subTitle={'Tambah data pegawai'}/>
                  <Button.CloseModal onClick={() =>
											setShowModal((prev) => ({
												...prev,
												base: false,
											}))
										}/>
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
							</Modal>
						)}

            {showModal.sm && (
							<Modal size='sm' closeOutside={true} setShowModal={setShowModal}>
								<Modal.Header>
                  <div>
                    <h3 className='font-bold mb-1'> Tambah Data </h3>
                    <span> Tambah data pegawai </span>
                  </div>
                  <Button.CloseModal onClick={() =>
											setShowModal((prev) => ({
												...prev,
												sm: false,
											}))
										}/>
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
							</Modal>
						)}

            {showModal.lg && (
							<Modal size='lg' closeOutside={true} setShowModal={setShowModal}>
								<Modal.Header>
                  <div>
                    <h3 className='font-bold mb-1'> Tambah Data </h3>
                    <span> Tambah data pegawai </span>
                  </div>
                  <Button.CloseModal onClick={() =>
											setShowModal((prev) => ({
												...prev,
												lg: false,
											}))
										}/>
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
							</Modal>
						)}

            {showModal.xl && (
							<Modal size='xl' closeOutside={true} setShowModal={setShowModal}>
								<Modal.Header>
                  <div>
                    <h3 className='font-bold mb-1'> Tambah Data </h3>
                    <span> Tambah data pegawai </span>
                  </div>
                  <Button.CloseModal onClick={() =>
											setShowModal((prev) => ({
												...prev,
												xl: false,
											}))
										}/>
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
							</Modal>
						)}

            {showModal.fullScreen && (
							<Modal size='fullscreen' closeOutside={true} setShowModal={setShowModal}>
								<Modal.Header>
                  <div>
                    <h3 className='font-bold mb-1'> Tambah Data </h3>
                    <span> Tambah data pegawai </span>
                  </div>
                  <Button.CloseModal onClick={() =>
											setShowModal((prev) => ({
												...prev,
												fullScreen: false,
											}))
										}/>
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
							</Modal>
						)}

						
					</AnimatePresence>

          
            <br/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aliquid rem enim fugit deserunt corrupti quos quo ex necessitatibus debitis atque? Iure, totam. Accusantium quas tempora quisquam maiores veritatis placeat facilis atque facere a doloremque, eos sapiente! Labore, laboriosam illo consequuntur aspernatur eveniet blanditiis numquam ullam tenetur enim repudiandae amet. Corporis et necessitatibus in quam enim, obcaecati dicta, dolores debitis eius blanditiis ad totam magnam dolorem, odit ullam nesciunt cumque sint qui facere dolorum? Saepe adipisci minima architecto similique exercitationem accusamus natus laboriosam? Vitae ex cupiditate, pariatur non unde doloribus ipsam sit ea explicabo quidem. Necessitatibus mollitia quidem quibusdam, vero doloribus iste expedita repellendus fugit dolores odit est dolore eius laboriosam saepe eligendi aut molestias quisquam quia. Veniam, explicabo fugiat adipisci odit voluptates illo quidem neque cumque perspiciatis facere, debitis totam! Fuga, dicta ex ab iure libero omnis, aliquid sed iusto ullam laboriosam maiores aliquam dignissimos placeat repudiandae molestias inventore quis ipsam, rerum culpa necessitatibus qui architecto. Minus incidunt, fugiat error dignissimos voluptate facere, consequuntur illo dicta praesentium deserunt corrupti debitis tempore. Maiores tempora voluptas tenetur alias earum enim ab reprehenderit nemo doloremque illo suscipit, eligendi omnis, fuga quis molestias a similique amet cupiditate necessitatibus laudantium sit iusto dolores minus inventore. Beatae sunt quia impedit, sed voluptates excepturi natus provident maiores quasi similique nostrum obcaecati, vitae ducimus? Tempore, quia? Eius, iure facere. Rerum amet quo atque mollitia, molestias dolores quasi, iste provident tempore obcaecati eum saepe voluptatibus velit deleniti. Ipsum ut magni, culpa aliquid quae illo, dolorum nulla recusandae ab perspiciatis repellat a iste sequi, laboriosam quia dicta accusamus praesentium id corporis deleniti aut minima neque explicabo vitae? Architecto reprehenderit in iure rerum eaque, a dolore officiis, sint nihil, perspiciatis aut veritatis praesentium error tempore! Est assumenda nulla esse eveniet minima at, incidunt nemo corrupti animi libero tenetur, quaerat quidem in, aspernatur ratione enim facilis! Eius libero inventore quae excepturi officia laboriosam error in atque, sequi doloremque sunt voluptas nostrum animi omnis accusantium! Possimus ipsam suscipit inventore, dignissimos quibusdam error exercitationem ipsa laudantium a consectetur minus aspernatur omnis mollitia dolore! Corporis voluptatibus magnam nam adipisci mollitia, autem hic, consectetur sint ex dolor pariatur illo ipsum maxime unde maiores ipsa impedit quasi expedita blanditiis aspernatur nostrum asperiores et itaque? Quia, temporibus magni. Iusto suscipit dignissimos enim dolore dolorem repellat beatae corporis, temporibus voluptatem quos esse, ex doloremque. Cupiditate nisi quam voluptate, earum tempora molestias. Laborum ut dolore quos. Doloribus sed consequatur veniam perspiciatis explicabo adipisci incidunt ratione modi obcaecati. Obcaecati deleniti officiis eum earum molestias ducimus quam repellat nam, excepturi voluptatibus architecto tempora voluptatem voluptas ipsum. Laudantium enim sapiente perferendis repudiandae beatae est nam officia iste veritatis molestias asperiores, obcaecati corrupti dolor exercitationem tempore corporis qui cum expedita libero earum ratione pariatur sed sit nulla. Quod blanditiis voluptatum ipsum, vitae voluptas quisquam perspiciatis corrupti est nihil vel sapiente praesentium corporis! Ipsam commodi voluptates cumque voluptas, accusamus officiis, earum deleniti blanditiis vero impedit labore officia quis dolorum sunt similique laudantium eius. Sunt cum iusto praesentium illum aliquid, ab minus adipisci quod perferendis.
        </Card>
        
    </>
  )
}

export default Dashboard