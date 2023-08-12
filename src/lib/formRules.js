export const FormRules = {
   Required: (message) => {
      return {value: true, message: message || 'Wajib diisi'}
   },
   MaxLength: (max, message) => {
      return {value: max, message: message || `Maksimal diisi ${max} karakter`}
   },
   MinLength: (min, message) => {
      return {value: min, message: message || `Minimal diisi ${min} karakter`}
   },
   MaxNumber: (max, message) => {
      return {value: max, message: message || `Maksimal diisi ${max}`}
   },
   MinNumber: (min, message) => {
      return {value: min, message: message || `Minimal diisi ${max}`}
   },
   OnlyLetter: (message) => {
      return {value: /^[a-z ,_.'-]+$/i, message: message || 'Input tidak sesuai dengan ketentuan'}
   },
   OnlyNumber: (message) => {
      return {value: /^[0-9]*$/, message: message || 'Hanya boleh diisi angka positif'}
   }
}