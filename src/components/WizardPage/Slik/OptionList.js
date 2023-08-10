export const valueStatusPinjaman = {
    TiDAK_ADA_PINJAMAN: 5,
    ADA_STATUS_LANCAR: 4,
    ADA_STATUS_MENUNGGAK_BELUM_MACET: 3,
    ADA_STATUS_MACET: 2
 }
 
 export const statusPinjamanOptions = [
    { value: valueStatusPinjaman.TiDAK_ADA_PINJAMAN, label: "Tidak ada pinjaman" },
    { value: valueStatusPinjaman.ADA_STATUS_LANCAR, label: "Ada status lancar" },
    { value: valueStatusPinjaman.ADA_STATUS_MENUNGGAK_BELUM_MACET, label: "Ada status menunggak belum macet" },
    { value: valueStatusPinjaman.ADA_STATUS_MACET, label: "Ada status macet" }
 ];
 
 const valueStatusSlik = {
    BELUM_ADA_HASIL: 0,
    POSITIF: 1,
    NEGATIF: 9,
 }
 
 export const statusSlikOptions = [
    { value: valueStatusSlik.BELUM_ADA_HASIL, label: "Belum ada hasil" },
    { value: valueStatusSlik.POSITIF, label: "Positif" },
    { value: valueStatusSlik.NEGATIF, label: "Negatif" }
 ];
 
 {/* <select class="form-control form-control-sm" name="kolek1" id="kolek1"><option selected="" value="1">Kol 1 - Lancar</option><option value="2">Kol 2 - Dalam Perhatian Khusus</option><option value="3">Kol 3 - Kurang Lancar</option><option value="4">Kol 4 - Diragukan</option><option value="5">Kol 5 - Macet</option></select> */}
 
 export const valueKolektibilitas = {
    LANCAR: 1,
    DALAM_PERHATIAN_KHUSUS: 2,
    KURANG_LANCAR: 3,
    DIRAGUKAN: 4,
    MACET: 5
 }
 
 export const KolektibilitasOptions = [
    { value: '', label: 'Pilih kolektibilitas', disabled: true},
    { value: valueKolektibilitas.LANCAR, label: 'Kol 1 - Lancar'},
    { value: valueKolektibilitas.DALAM_PERHATIAN_KHUSUS, label: 'Kol 2 - Dalam Perhatian Khusus'},
    { value: valueKolektibilitas.KURANG_LANCAR, label: 'Kol 3 - Kurang Lancar'},
    { value: valueKolektibilitas.DIRAGUKAN, label: 'Kol 4 - Diragukan'},
    { value: valueKolektibilitas.MACET, label: 'Kol 5 - Macet'},
 ]