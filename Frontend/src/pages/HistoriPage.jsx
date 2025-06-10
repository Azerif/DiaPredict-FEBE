import React from 'react'
import HistoriSection from '../components/HistoriSection'
import Footer from '../components/Footer'
import NavbarAfter from '../components/NavbarAfter'

const HistoriPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <NavbarAfter />
      <main className="py-10 mt-2">
        <HistoriSection />
      </main>
      <Footer showUserNav={true} />
    </div>
  )
}

export default HistoriPage
