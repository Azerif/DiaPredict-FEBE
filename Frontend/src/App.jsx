import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className='text-red-500 text-bold text-9xl'>Prediksi Diabetes berdasarkan gaya hidup</p>
    </>
  )
}

export default App
