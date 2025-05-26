import React, { useState } from 'react'
import axios from 'axios';

const Test = () => {

    const [inputs, setInputs] = useState({ feature1: 1, feature2: 56, feature3: 156, feature4: 42, feature5: 0, feature6: 1, feature7: 0 });
  const [risk, setRisk] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) });
  };

  const predict = async () => {
    try {
      const response = await axios.post("http://localhost:8000/predict", inputs);
      setRisk(response.data.risk_percent);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <h2>Heart Disease Risk Predictor</h2>
      {Object.keys(inputs).map((key) => (
        <div key={key}>
          <label>{key}:</label>
          <input type="number" name={key} value={inputs[key]} onChange={handleChange} />
        </div>
      ))}
      <button onClick={predict}>Predict</button>
      {risk !== null && <h3>Risk: {risk}%</h3>}
    </div>
  )
}

export default Test