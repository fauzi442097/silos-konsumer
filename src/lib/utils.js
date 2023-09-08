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

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const generateId = () => {
   var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
   return randLetter + Date.now();
}

export const getKeyOfObject = (obj, value) => {
   return Object.keys(obj).find(k=>obj[k]===value);
}

export const clearFormatRupiah = (value) => {
   return Number(value.replaceAll('.', ''))
}

export const formatTanggal = (value) => {
   value = moment(value, "YYYY-MM-DD");
   let tanggal = moment(value).format("YYYY-MM-DD");

   return  tanggal;
}