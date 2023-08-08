import * as yup from "yup";

export const formDataNasabahSchema = yup.object({
    nama_nasabah: yup.string().required('Wajib diisi').max('50', 'Maksimal 50 karakter'),
    no_identitas: yup.string().required('Wajib diisi').matches(/^[0-9]{16}$/, 'Wajib diisi 16 digit angka')
})

export const formDataPasangan = yup.object({
    nama_pasangan: yup.string().required('Wajib diisi').max('50', 'Maksimal diisi 60 karakter')
})

