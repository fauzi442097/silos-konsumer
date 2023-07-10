import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import moment from 'moment';
import 'moment/locale/id'

const dateTime = new Date();

export function cn(...inputs) {
   return twMerge(clsx(inputs))
}

export function formatRupiah(value) {
   return new Intl.NumberFormat("id-ID").format(value);
}

export function formatTanggal(value){
   return new moment(value).format('LL');
}