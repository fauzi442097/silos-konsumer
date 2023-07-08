import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
   return twMerge(clsx(inputs))
}

export function formatRupiah(value) {
   return new Intl.NumberFormat("id-ID").format(value);
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))