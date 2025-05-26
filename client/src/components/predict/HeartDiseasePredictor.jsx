import React, { useState } from 'react';
import { Heart, User, Activity, Droplets, TestTube, Cigarette, Pill, AlertCircle, CheckCircle, XCircle, Loader } from 'lucide-react';

const HeartDiseasePredictor = () => {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    tc: '',
    hdl: '',
    smoke: '',
    bpm: '',
    diabetes: ''
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    const requiredFields = ['gender', 'age', 'tc', 'hdl', 'smoke', 'bpm', 'diabetes'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError('Please fill in all fields');
        return false;
      }
    }
    
    // Validate age range
    if (parseInt(formData.age) < 18 || parseInt(formData.age) > 120) {
      setError('Age must be between 18 and 120');
      return false;
    }
    
    // Validate blood pressure range
    if (parseInt(formData.bpm) < 80 || parseInt(formData.bpm) > 250) {
      setError('Blood pressure must be between 80 and 250');
      return false;
    }
    
    // Validate total cholesterol
    if (parseInt(formData.tc) < 100 || parseInt(formData.tc) > 500) {
      setError('Total cholesterol must be between 100 and 500 mg/dL');
      return false;
    }
    
    // Validate HDL cholesterol
    if (parseInt(formData.hdl) < 20 || parseInt(formData.hdl) > 100) {
      setError('HDL cholesterol must be between 20 and 100 mg/dL');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setPrediction(null);
    
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Prediction failed');
      }
      
      setPrediction(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (percentage) => {
    if (percentage < 20) return 'text-green-600';
    if (percentage < 40) return 'text-yellow-600';
    if (percentage < 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRiskBgColor = (percentage) => {
    if (percentage < 20) return 'bg-green-100 border-green-300';
    if (percentage < 40) return 'bg-yellow-100 border-yellow-300';
    if (percentage < 60) return 'bg-orange-100 border-orange-300';
    return 'bg-red-100 border-red-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-red-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Heart Disease Risk Predictor</h1>
          </div>
          <p className="text-gray-600 text-lg">Enter your health information to assess your heart disease risk</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <User className="h-6 w-6 mr-2 text-blue-500" />
              Patient Information
            </h2>
            
            <div className="space-y-4">
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter age"
                  min="18"
                  max="120"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Cholesterol Values */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <TestTube className="h-4 w-4 mr-1 text-purple-500" />
                    Total Cholesterol (TC)
                  </label>
                  <input
                    type="number"
                    name="tc"
                    value={formData.tc}
                    onChange={handleInputChange}
                    placeholder="200"
                    min="100"
                    max="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <TestTube className="h-4 w-4 mr-1 text-green-500" />
                    HDL Cholesterol
                  </label>
                  <input
                    type="number"
                    name="hdl"
                    value={formData.hdl}
                    onChange={handleInputChange}
                    placeholder="50"
                    min="20"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Blood Pressure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Activity className="h-4 w-4 mr-1 text-red-500" />
                  Blood Pressure (mmHg)
                </label>
                <input
                  type="number"
                  name="bpm"
                  value={formData.bpm}
                  onChange={handleInputChange}
                  placeholder="120"
                  min="80"
                  max="250"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Smoking Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Cigarette className="h-4 w-4 mr-1 text-gray-500" />
                  Smoking Status
                </label>
                <select
                  name="smoke"
                  value={formData.smoke}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="0">Non-smoker</option>
                  <option value="1">Smoker</option>
                </select>
              </div>

              {/* Diabetes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Pill className="h-4 w-4 mr-1 text-green-500" />
                  Diabetes Status
                </label>
                <select
                  name="diabetes"
                  value={formData.diabetes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="0">No Diabetes</option>
                  <option value="1">Has Diabetes</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5 mr-2" />
                    Predict Risk
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <Activity className="h-6 w-6 mr-2 text-green-500" />
              Risk Assessment
            </h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-3" />
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            {prediction && (
              <div className="space-y-6">
                {/* Risk Percentage */}
                <div className={`p-6 rounded-lg border-2 ${getRiskBgColor(prediction.risk_percentage)}`}>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Heart Disease Risk</h3>
                    <div className={`text-4xl font-bold ${getRiskColor(prediction.risk_percentage)} mb-2`}>
                      {prediction.risk_percentage}%
                    </div>
                    <p className={`text-lg font-medium ${getRiskColor(prediction.risk_percentage)}`}>
                      {prediction.risk_category} Risk
                    </p>
                  </div>
                </div>

                {/* Input Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">Input Summary:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>Gender:</strong> {prediction.input_features.gender}</div>
                    <div><strong>Age:</strong> {prediction.input_features.age} years</div>
                    <div><strong>Total Cholesterol:</strong> {prediction.input_features.total_cholesterol} mg/dL</div>
                    <div><strong>HDL Cholesterol:</strong> {prediction.input_features.hdl_cholesterol} mg/dL</div>
                    <div><strong>Blood Pressure:</strong> {prediction.input_features.blood_pressure} mmHg</div>
                    <div><strong>Smoking:</strong> {prediction.input_features.smoke}</div>
                    <div><strong>Diabetes:</strong> {prediction.input_features.diabetes}</div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Important Notice</h4>
                      <p className="text-yellow-700 text-sm">
                        This prediction is for educational purposes only and should not replace professional medical advice. 
                        Please consult with a healthcare provider for proper medical evaluation and treatment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {!prediction && !error && !loading && (
              <div className="text-center text-gray-500 py-12">
                <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p>Fill out the form and click "Predict Risk" to see your heart disease risk assessment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartDiseasePredictor;