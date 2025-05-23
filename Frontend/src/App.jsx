import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LandingPage from './pages/LandingPage'
import HistoriPage from './pages/HistoriPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <LandingPage />
      {/* <LoginPage /> */}
      <RegisterPage />
      <HistoriPage />
    </div>
  )
}

export default App
