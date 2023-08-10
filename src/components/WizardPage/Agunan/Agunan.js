import React, { useEffect, useState } from 'react'

import Button, { ButtonCloseModal } from '@/components/Button';
import dynamic from 'next/dynamic';
import MySelect from '@/components/Form/Select';
// import { KolektibilitasOptions } from './OptionList'
// import { cn, generateId } from '@/lib/utils'
// import { Controller } from 'react-hook-form'
import TabAction from '@/components/TabAction';
import Modal from "@/components/Modal/ModalSection";
import Preloader from "@/components/Layout/Admin/Header/Preloader";
import useGet from '@/hooks/useGet'
import ModalAgunanProperty from './ModalAgunanProperty';
import ModalKartuPegawai from './ModalKartuPegawai';
import ModalAgunanTaspen from './ModalAgunanTaspen';
import ModalAgunanSK from './ModalAgunanSK';

const MyModal = dynamic(() => import('../../Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

// const TableRows = ({ fields, remove, register, errors, control, handleChange, kol }) => {
//    return (
//       fields.map((item, index) => {
//          return (<tr key={item.id} className={cn(index != 0 && 'border-t')}>
//             <td className='px-6 py-3'> 
//                <Input.Text 
//                   key={item.id}
//                   errors={errors.loan?.[index]?.lembaga_keuangan}
//                   register={register}
//                   name={`loan.${index}.lembaga_keuangan`} 
//                   placeholder='OJK'/>
//             </td>
//             <td className='px-6 py-3'> 
//                <Input.Currency 
//                   key={item.id}
//                   placeholder={'1,000,000'}
//                   className={'text-right'}
//                   register={register}
//                   errors={errors.loan?.[index]?.baki_debet}
//                   name={`loan.${index}.baki_debet`} 
//                   allowDecimals={false}
//                   allowNegativeValue={false}
//                />
//             </td>
//             <td className='px-6 py-3'> 
//                <Controller
//                   control={control}
//                   name={`loan.${index}.kolektibilitas`} 
//                   render={({ field: { onChange, value, name, ref } }) => {
//                      return (
//                      <MySelect 
//                         name={`loan.${index}.kolektibilitas`} 
//                         register={register} 
//                         errors={errors.loan?.[index]?.kolektibilitas}
//                         options={KolektibilitasOptions} 
//                         value={kol[index].item}
//                         onChange={(e) => handleChange(e, kol[index].id, onChange)}
//                      />
//                   )}}
//                />
//             </td>
//             <td className='px-6 py-3'> 
//                <Input.Text 
//                   key={item.id}       
//                   register={register}
//                   errors={errors.loan?.[index]?.keterangan}
//                   name={`loan.${index}.keterangan`} 
//                   maxLength={30}
//                />
//             </td>
//             <td className='px-6 py-3'> 
//                <div className='flex flex-wrap gap-4'>
//                   <Radio label="Aktif" name={`loan.${index}.status`} register={register} value="active"/>
//                   <Radio label="Non Aktif" name={`loan.${index}.status`} register={register} value="inactive"/>
//                </div>
//                {errors.loan?.[index]?.status && <span className='mt-1 block text-sm form-invalid-message'>{errors.loan?.[index]?.status.message}</span>}
//             </td>
//             <td className='px-6 py-3' align='center'>
//                <Button variant={'danger'} size={'sm'} onClick={() => remove(index)}>  Hapus </Button>
//             </td>
//          </tr>)
//       })
//    )
// }

const Agunan = ({ prevAction, onSubmit }) => {
    const [refListAgunan, setRefListAgunan] = useState([]);
    const [refAgunan, setRefAgunan] = useState(null);

    const [showModal, setShowModal] = useState({
        xl: false,
    });

    let arrJenisAgunan = [];
    const id = 4;
    const { data, isLoading, isError, error, isFetching, refetch } = useGet(['refJenisAgunan', id], `master/list/tipe-agunan/${id}/?idPekerjaan=8`, { retry: 1, refetchOnWindowFocus: false, enabled: id != null })

    useEffect(() => {
        if(!isLoading){
            let getDataAgunan = data?.data.data;
            getDataAgunan.map((item) => {
                return arrJenisAgunan.push({ value: item.id, label: item.definition })
            });
            
            setRefListAgunan(arrJenisAgunan);
        }
    }, [])

    const handleChangeAgunan = value => {
        setRefAgunan(value);

        if (value.value === 4){
            showModalDialog('property');
        }

        if(value.value === 7){
            showModalDialog('kartuPegawai');
        }

        if(value.value === 6){
            showModalDialog('agunanTaspen');
        }

        if(value.value === 3){
            showModalDialog('agunanSK');
        }
    }
    
    const showModalDialog = (type) => {
        setShowModal((prev) => ({ ...prev, [type]: true }))
    }

    const storeChecklistDokumen = (data) => {
        onSubmit();
    }

    return (
        <>
            <div className='my-8'>
                <div className='flex flex-wrap justify-between items-center mb-3'>
                    <p className='text-lg font-inter-medium'> List Agunan </p>
                    <Button variant={'outline'} onClick={() => showModalDialog('sm')}> Tambah Agunan </Button>
                </div>

                <div>
                    <table className='w-full'>
                        <thead className=' bg-gray-100  text-gray-600 dark:bg-dark-depth3 dark:text-grey'>
                            <tr>
                                <td className='px-6 py-3 font-inter-medium rounded-tl-xl rounded-bl-xl'> Aksi </td>
                                <td className='px-6 py-3 font-inter-medium'> Jenis Agunan </td>
                                <td className='px-6 py-3 font-inter-medium'> Nomor Agunan </td>
                                <td className='px-6 py-3 font-inter-medium'> Nilai Appraisal </td>
                                <td className='px-6 py-3 font-inter-medium rounded-tr-xl rounded-br-xl'> Status Upload Dokumen </td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>

            <TabAction onSubmit={storeChecklistDokumen} prevAction={prevAction} />

            {showModal.sm && (
                <MyModal closeOutside={true} setShowModal={setShowModal}>
                    <Modal.Header>
                        <div>
                            <h3 className='font-bold mb-1'> Agunan </h3>
                            <span> Tambah data agunan </span>
                        </div>
                        <ButtonCloseModal onClick={() =>
                            setShowModal((prev) => ({
                                ...prev,
                                sm: false,
                            }))
                        } />
                    </Modal.Header>
                    <Modal.Body>
                        <div className='mb-5'>
                            <label className='block mb-3'> Jenis Agunan </label>
                            <MySelect selectInModal withSearch id="jenisAgunan" name="jenisAgunan" options={refListAgunan} value={refAgunan} placeholder="Isikan jenis Agunan" onChange={handleChangeAgunan} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setShowModal((prev) => ({
                                    ...prev,
                                    sm: false,
                                }))
                            }>Batal</Button>
                    </Modal.Footer>
                </MyModal>
            )}


            {showModal.property && (
                <MyModal size='xl' closeOutside={true} setShowModal={setShowModal}>
                    <Modal.Header>
                        <div>
                            <h3 className='font-bold mb-1'> Agunan </h3>
                            <span> Tambah data agunan </span>
                        </div>
                        <ButtonCloseModal onClick={() =>
                            setShowModal((prev) => ({
                                ...prev,
                                property: false,
                            }))
                        } />
                    </Modal.Header>
                    <Modal.Body>
                        <ModalAgunanProperty />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setShowModal((prev) => ({
                                    ...prev,
                                    property: false,
                                }))
                            }>Kembali</Button>
                        <Button>Simpan</Button>
                    </Modal.Footer>
                </MyModal>
            )}

            {showModal.kartuPegawai && (
                <MyModal closeOutside={true} setShowModal={setShowModal}>
                    <Modal.Header>
                        <div>
                            <h3 className='font-bold mb-1'> Agunan </h3>
                            <span> Tambah data agunan </span>
                        </div>
                        <ButtonCloseModal onClick={() =>
                            setShowModal((prev) => ({
                                ...prev,
                                kartuPegawai: false,
                            }))
                        } />
                    </Modal.Header>
                    <Modal.Body>
                        <ModalKartuPegawai />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setShowModal((prev) => ({
                                    ...prev,
                                    kartuPegawai: false,
                                }))
                            }>Kembali</Button>
                        <Button>Simpan</Button>
                    </Modal.Footer>
                </MyModal>
            )}

            {showModal.agunanTaspen && (
                <MyModal closeOutside={true} setShowModal={setShowModal}>
                    <Modal.Header>
                        <div>
                            <h3 className='font-bold mb-1'> Agunan </h3>
                            <span> Tambah data agunan </span>
                        </div>
                        <ButtonCloseModal onClick={() =>
                            setShowModal((prev) => ({
                                ...prev,
                                agunanTaspen: false,
                            }))
                        } />
                    </Modal.Header>
                    <Modal.Body>
                        <ModalAgunanTaspen />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setShowModal((prev) => ({
                                    ...prev,
                                    agunanTaspen: false,
                                }))
                            }>Kembali</Button>
                        <Button>Simpan</Button>
                    </Modal.Footer>
                </MyModal>
            )}

            {showModal.agunanSK && (
                <MyModal size='lg' closeOutside={true} setShowModal={setShowModal}>
                    <Modal.Header>
                        <div>
                            <h3 className='font-bold mb-1'> Agunan </h3>
                            <span> Tambah data agunan </span>
                        </div>
                        <ButtonCloseModal onClick={() =>
                            setShowModal((prev) => ({
                                ...prev,
                                agunanSK: false,
                            }))
                        } />
                    </Modal.Header>
                    <Modal.Body>
                        <ModalAgunanSK />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setShowModal((prev) => ({
                                    ...prev,
                                    agunanSK: false,
                                }))
                            }>Kembali</Button>
                        <Button>Simpan</Button>
                    </Modal.Footer>
                </MyModal>
            )}
        </>
    )
}
export default Agunan