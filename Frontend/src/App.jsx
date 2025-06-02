import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { ProtectedRoute, PublicRoute } from './routes';
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
          <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>}/>
          <Route path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>}/>
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path='/histori' element={<ProtectedRoute><HistoriPage /></ProtectedRoute>}/>
          <Route path='/education' element={<ProtectedRoute><Education /></ProtectedRoute>}/>
        </Routes>    
    </BrowserRouter>
  )
}

export default App