import React from 'react'
import Mitra1 from '../assets/img/mitra-img/1.png'
import Mitra2 from '../assets/img/mitra-img/2.png'
import Mitra3 from '../assets/img/mitra-img/3.png'

const MitraSection = () => {
  return (
    <section className='max-w-[1200px] mx-auto mb-30 px-6'>
      <div className='flex flex-row items-center justify-around sm:justify-around md:justify-around'>
        <img src={Mitra1} alt="Mitra 1" className='w-full max-w-[95px] sm:max-w-[200px] md:max-w-[250px]' />
        <img src={Mitra2} alt="Mitra 2" className='w-full max-w-[95px] sm:max-w-[200px] md:max-w-[250px]' />
        <img src={Mitra3} alt="Mitra 3" className='w-full max-w-[95px] sm:max-w-[200px] md:max-w-[250px]' />
      </div>
    </section>
  )
}

export default MitraSection
