import React from 'react'
import HistoriSection from '../components/HistoriSection'
import Footer from '../components/Footer'
import NavbarAfter from '../components/NavbarAfter'

const HistoriPage = () => {
  return (
    <div>
        <NavbarAfter />
        <HistoriSection />
        <Footer showUserNav={true} />
    </div>
  )
}

export default HistoriPage
