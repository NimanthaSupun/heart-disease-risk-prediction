import { useState } from 'react'
import './App.css'
import Predict from './components/Predict'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Predict />
   </div>
  )
}

export default App
