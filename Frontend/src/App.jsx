import { useState } from 'react'
import './App.css'
import HistoriPage from './pages/HistoriPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <HistoriPage />
    </div>
  )
}

export default App
