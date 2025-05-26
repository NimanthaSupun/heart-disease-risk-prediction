import { useState } from 'react'
import './App.css'
import Predict from './components/predict/Predict'
import Test from './components/test'
import HeartDiseasePredictor from './components/predict/HeartDiseasePredictor'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
   <HeartDiseasePredictor/>
   </div>
  )
}

export default App
