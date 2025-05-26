import { useState } from 'react'
import './App.css'
import Predict from './components/predict/Predict'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Predict/>
   </div>
  )
}

export default App
