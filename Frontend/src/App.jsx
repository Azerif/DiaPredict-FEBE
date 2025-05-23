import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import HistoriPage from './pages/HistoriPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <LandingPage />
      <HistoriPage />
    </div>
  )
}

export default App
