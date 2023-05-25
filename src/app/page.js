import Sidebar from '../../components/layout/sidebar'
import Header from '../../components/layout/header'
import Image from 'next/image'
import { AiOutlineDashboard } from 'react-icons/ai'
import { RxCaretDown, RxHamburgerMenu } from 'react-icons/rx'
import { BsFillSunFill } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { GrInProgress } from 'react-icons/gr'

export default function Home() {
  return (
    <div className='flex h-screen overflow-auto bg-[rgb(248,250,251)]'>
      <sidebar className='fixed left-0 bottom-0 top-0 w-72'>  
            <div className='mb-4 py-8'> 
              <Image 
                src={'/logo_bank_kalteng.png'} 
                alt='logo bank kalteng' 
                className='m-auto'
                width={200}
                height={200}/>
          </div>
          <nav className=' mx-8 flex flex-col gap-2 '>
            <menu className='flex items-center px-4 py-2'>
              <div className='flex gap-4 items-center'>   
                  <span className='text-lg'> <AiOutlineDashboard /> </span>
                  <span> Dashboard </span>
              </div> 
            </menu>
            <menu className='flex items-center px-4 py-2'>
              <div className='flex gap-4 items-center'>   
                  <span className='text-lg'> <GrInProgress /> </span>
                  <span> Dalam Proses </span>
              </div> 
            </menu>
            <menu className='flex items-center px-4 py-2'>
              <div className='flex gap-4 items-center'>   
                  <span className='text-lg'> <AiOutlineDashboard /> </span>
                  <span> Sudah Cair </span>
              </div> 
            </menu>
        </nav>
      </sidebar>
      <div className='w-full'> 

      <header className='h-20 fixed left-72 right-0'> 
        <div className='pl-4 pr-8 py-8 flex justify-between'>
          <div className='flex flex-row gap-2'> 
              <div className='btn-toolbar'> 
                <RxHamburgerMenu/>
              </div>
              <div className='btn-toolbar'> 
                <BsFillSunFill className='text-yellow-logo'/>
              </div>
          </div>
          <div className='flex flex-row gap-4 items-center'> 
              <div className='btn-toolbar'> 
                <IoMdNotificationsOutline/>
              </div>
              <div className="flex gap-3">
                <img 
                  src={'/man-avatar.png'} 
                  className='w-10 h-10 bg-white rounded-full object-contain' 
                  style={{ 
                    'boxShadow': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                   }}
                  alt='user' />
                  <div className='flex flex-col items-start'>
                      <span className='text-sm font-semibold'> 
                        Ahmad Fauzi 
                      </span>
                      <span className='text-primary text-xs'> Admin </span>
                  </div>
              </div>
          </div>
        </div>
      </header>

        <main className='ml-72 max-w-full  mt-20 overflow-auto'> 
          <div className='bg-white my-10 rounded-2xl ml-4 mx-8 p-8 ' style={{ 
            'boxShadow': '#c7cdc969 3px 0px 25px 0px'
           }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aliquid rem enim fugit deserunt corrupti quos quo ex necessitatibus debitis atque? Iure, totam. Accusantium quas tempora quisquam maiores veritatis placeat facilis atque facere a doloremque, eos sapiente! Labore, laboriosam illo consequuntur aspernatur eveniet blanditiis numquam ullam tenetur enim repudiandae amet. Corporis et necessitatibus in quam enim, obcaecati dicta, dolores debitis eius blanditiis ad totam magnam dolorem, odit ullam nesciunt cumque sint qui facere dolorum? Saepe adipisci minima architecto similique exercitationem accusamus natus laboriosam? Vitae ex cupiditate, pariatur non unde doloribus ipsam sit ea explicabo quidem. Necessitatibus mollitia quidem quibusdam, vero doloribus iste expedita repellendus fugit dolores odit est dolore eius laboriosam saepe eligendi aut molestias quisquam quia. Veniam, explicabo fugiat adipisci odit voluptates illo quidem neque cumque perspiciatis facere, debitis totam! Fuga, dicta ex ab iure libero omnis, aliquid sed iusto ullam laboriosam maiores aliquam dignissimos placeat repudiandae molestias inventore quis ipsam, rerum culpa necessitatibus qui architecto. Minus incidunt, fugiat error dignissimos voluptate facere, consequuntur illo dicta praesentium deserunt corrupti debitis tempore. Maiores tempora voluptas tenetur alias earum enim ab reprehenderit nemo doloremque illo suscipit, eligendi omnis, fuga quis molestias a similique amet cupiditate necessitatibus laudantium sit iusto dolores minus inventore. Beatae sunt quia impedit, sed voluptates excepturi natus provident maiores quasi similique nostrum obcaecati, vitae ducimus? Tempore, quia? Eius, iure facere. Rerum amet quo atque mollitia, molestias dolores quasi, iste provident tempore obcaecati eum saepe voluptatibus velit deleniti. Ipsum ut magni, culpa aliquid quae illo, dolorum nulla recusandae ab perspiciatis repellat a iste sequi, laboriosam quia dicta accusamus praesentium id corporis deleniti aut minima neque explicabo vitae? Architecto reprehenderit in iure rerum eaque, a dolore officiis, sint nihil, perspiciatis aut veritatis praesentium error tempore! Est assumenda nulla esse eveniet minima at, incidunt nemo corrupti animi libero tenetur, quaerat quidem in, aspernatur ratione enim facilis! Eius libero inventore quae excepturi officia laboriosam error in atque, sequi doloremque sunt voluptas nostrum animi omnis accusantium! Possimus ipsam suscipit inventore, dignissimos quibusdam error exercitationem ipsa laudantium a consectetur minus aspernatur omnis mollitia dolore! Corporis voluptatibus magnam nam adipisci mollitia, autem hic, consectetur sint ex dolor pariatur illo ipsum maxime unde maiores ipsa impedit quasi expedita blanditiis aspernatur nostrum asperiores et itaque? Quia, temporibus magni. Iusto suscipit dignissimos enim dolore dolorem repellat beatae corporis, temporibus voluptatem quos esse, ex doloremque. Cupiditate nisi quam voluptate, earum tempora molestias. Laborum ut dolore quos. Doloribus sed consequatur veniam perspiciatis explicabo adipisci incidunt ratione modi obcaecati. Obcaecati deleniti officiis eum earum molestias ducimus quam repellat nam, excepturi voluptatibus architecto tempora voluptatem voluptas ipsum. Laudantium enim sapiente perferendis repudiandae beatae est nam officia iste veritatis molestias asperiores, obcaecati corrupti dolor exercitationem tempore corporis qui cum expedita libero earum ratione pariatur sed sit nulla. Quod blanditiis voluptatum ipsum, vitae voluptas quisquam perspiciatis corrupti est nihil vel sapiente praesentium corporis! Ipsam commodi voluptates cumque voluptas, accusamus officiis, earum deleniti blanditiis vero impedit labore officia quis dolorum sunt similique laudantium eius. Sunt cum iusto praesentium illum aliquid, ab minus adipisci quod perferendis.
          </div>
        </main>
      </div>
    </div>
  )
}
