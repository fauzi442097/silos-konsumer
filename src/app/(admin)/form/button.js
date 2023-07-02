import Button from '@/components/Button'
import React from 'react'
const SaveIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path fill='currentColor' d='M7 19v-6h10v6h2V7.828L16.172 5H5v14h2ZM4 3h13l4 4v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm5 12v4h6v-4H9Z'/></svg>"

const FormButton = () => {
  return (
   <div className='flex gap-2 items-start'>
      <Button size={'sm'}> Simpan </Button>
      <Button> Simpan </Button>
      <Button variant={'light'} size={'lg'}> Simpan </Button>
      <Button variant={'outline'}> Simpan </Button>
      <Button variant={'light'} size={'sm'}> 
        <span dangerouslySetInnerHTML={{ __html: SaveIcon }}/>
      </Button>
      <Button variant={'secondary'}> Simpan </Button>
      <Button variant={'light'}> Simpan </Button>
   </div>
  )
}

export default FormButton