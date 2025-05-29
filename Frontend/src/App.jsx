import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LandingPage from './pages/LandingPage'
import HistoriPage from './pages/HistoriPage'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Education from './pages/Education'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/histori' element={<HistoriPage />}/>
          <Route path='/education' element={<Education />}/>
        </Routes>    
    </BrowserRouter>
  )
}

export default App
