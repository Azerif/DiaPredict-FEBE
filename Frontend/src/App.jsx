import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <LoginPage /> */}
      <RegisterPage />
    </div>
  )
}

export default App
