import React from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useTheme } from '@/app/hooks/ThemeContext'
import { useSidebar } from '@/app/hooks/SidebarContext'

const Layout = () => {

  const { theme } = useTheme()
  const { openSidebar } = useSidebar()
  const boxShadowCardStyle = theme == 'light' ? {
    'boxShadow': '#c7cdc969 3px 0px 25px 0px'
  } : {}

  return (
    <div className={`${theme == 'dark' ? 'dark' : ''}`}>
      <div className={`flex h-screen overflow-auto bg-main dark:bg-dark-main transition-color duration-200`}>
        <Sidebar/>
        <div className={`w-full container-content relative ${openSidebar ? 'ml-72' : 'ml-28'} transition-all duration-300 flex-1`}> 
          <Header/>
          <main className='max-w-full mx-5 mt-24 overflow-auto z-10 relative '> 

            <div className='content ml-4 mx-8 mt-10 '>
              <h1 className='text-3xl font-semibold dark:text-white'> Dashboard </h1>
              <div style={boxShadowCardStyle} className='card bg-white dark:bg-dark-depth1 dark:text-grey dark:shadow-none'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, aliquid rem enim fugit deserunt corrupti quos quo ex necessitatibus debitis atque? Iure, totam. Accusantium quas tempora quisquam maiores veritatis placeat facilis atque facere a doloremque, eos sapiente! Labore, laboriosam illo consequuntur aspernatur eveniet blanditiis numquam ullam tenetur enim repudiandae amet. Corporis et necessitatibus in quam enim, obcaecati dicta, dolores debitis eius blanditiis ad totam magnam dolorem, odit ullam nesciunt cumque sint qui facere dolorum? Saepe adipisci minima architecto similique exercitationem accusamus natus laboriosam? Vitae ex cupiditate, pariatur non unde doloribus ipsam sit ea explicabo quidem. Necessitatibus mollitia quidem quibusdam, vero doloribus iste expedita repellendus fugit dolores odit est dolore eius laboriosam saepe eligendi aut molestias quisquam quia. Veniam, explicabo fugiat adipisci odit voluptates illo quidem neque cumque perspiciatis facere, debitis totam! Fuga, dicta ex ab iure libero omnis, aliquid sed iusto ullam laboriosam maiores aliquam dignissimos placeat repudiandae molestias inventore quis ipsam, rerum culpa necessitatibus qui architecto. Minus incidunt, fugiat error dignissimos voluptate facere, consequuntur illo dicta praesentium deserunt corrupti debitis tempore. Maiores tempora voluptas tenetur alias earum enim ab reprehenderit nemo doloremque illo suscipit, eligendi omnis, fuga quis molestias a similique amet cupiditate necessitatibus laudantium sit iusto dolores minus inventore. Beatae sunt quia impedit, sed voluptates excepturi natus provident maiores quasi similique nostrum obcaecati, vitae ducimus? Tempore, quia? Eius, iure facere. Rerum amet quo atque mollitia, molestias dolores quasi, iste provident tempore obcaecati eum saepe voluptatibus velit deleniti. Ipsum ut magni, culpa aliquid quae illo, dolorum nulla recusandae ab perspiciatis repellat a iste sequi, laboriosam quia dicta accusamus praesentium id corporis deleniti aut minima neque explicabo vitae? Architecto reprehenderit in iure rerum eaque, a dolore officiis, sint nihil, perspiciatis aut veritatis praesentium error tempore! Est assumenda nulla esse eveniet minima at, incidunt nemo corrupti animi libero tenetur, quaerat quidem in, aspernatur ratione enim facilis! Eius libero inventore quae excepturi officia laboriosam error in atque, sequi doloremque sunt voluptas nostrum animi omnis accusantium! Possimus ipsam suscipit inventore, dignissimos quibusdam error exercitationem ipsa laudantium a consectetur minus aspernatur omnis mollitia dolore! Corporis voluptatibus magnam nam adipisci mollitia, autem hic, consectetur sint ex dolor pariatur illo ipsum maxime unde maiores ipsa impedit quasi expedita blanditiis aspernatur nostrum asperiores et itaque? Quia, temporibus magni. Iusto suscipit dignissimos enim dolore dolorem repellat beatae corporis, temporibus voluptatem quos esse, ex doloremque. Cupiditate nisi quam voluptate, earum tempora molestias. Laborum ut dolore quos. Doloribus sed consequatur veniam perspiciatis explicabo adipisci incidunt ratione modi obcaecati. Obcaecati deleniti officiis eum earum molestias ducimus quam repellat nam, excepturi voluptatibus architecto tempora voluptatem voluptas ipsum. Laudantium enim sapiente perferendis repudiandae beatae est nam officia iste veritatis molestias asperiores, obcaecati corrupti dolor exercitationem tempore corporis qui cum expedita libero earum ratione pariatur sed sit nulla. Quod blanditiis voluptatum ipsum, vitae voluptas quisquam perspiciatis corrupti est nihil vel sapiente praesentium corporis! Ipsam commodi voluptates cumque voluptas, accusamus officiis, earum deleniti blanditiis vero impedit labore officia quis dolorum sunt similique laudantium eius. Sunt cum iusto praesentium illum aliquid, ab minus adipisci quod perferendis.
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout