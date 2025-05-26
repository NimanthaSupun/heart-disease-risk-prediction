import { useState } from 'react'
import './App.css'
import Predict from './components/predict/Predict'
import Test from './components/test'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    {/* <Predict/> */}
    <Test/>
   </div>
  )
}

export default App
