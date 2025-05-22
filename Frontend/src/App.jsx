import { useState } from 'react'
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
