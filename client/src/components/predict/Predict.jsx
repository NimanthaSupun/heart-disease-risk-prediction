import React, { useState } from 'react'
import axios from 'axios';
const Predict = () => {
 const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    tc: '',
    hdl: '',
    smoke: '',
    bpm: '',
    diab: ''
  });
  
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.age || formData.age < 1 || formData.age > 120) newErrors.age = 'Valid age is required';
    if (!formData.tc || formData.tc < 0) newErrors.tc = 'Valid TC value is required';
    if (!formData.hdl || formData.hdl < 0) newErrors.hdl = 'Valid HDL value is required';
    if (!formData.smoke) newErrors.smoke = 'Smoking status is required';
    if (!formData.bpm) newErrors.bpm = 'Blood pressure medication status is required';
    if (!formData.diab) newErrors.diab = 'Diabetes status is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const predict = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Prepare data for API (converting to the format your backend expects)
    const inputs = {
      feature1: parseInt(formData.gender), // Gender
      feature2: parseInt(formData.age), // Age
      feature3: parseFloat(formData.tc), // TC
      feature4: parseFloat(formData.hdl), // HDL
      feature5: parseInt(formData.smoke), // Smoke
      feature6: parseInt(formData.bpm), // Blood Pressure Medication
      feature7: parseInt(formData.diab) // Diabetes
    };
    
    try {
      const response = await axios.post("http://localhost:8000/predict", inputs);
      setRisk(response.data.risk_percent);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      gender: '',
      age: '',
      tc: '',
      hdl: '',
      smoke: '',
      bpm: '',
      diab: ''
    });
    setRisk(null);
    setErrors({});
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Heart Disease Risk Predictor
            </h1>
            <p className="text-gray-600">
              Enter your health information to assess your cardiovascular risk
            </p>
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Gender Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.gender ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Gender</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            {/* Age Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="120"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your age"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>

            {/* TC Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Cholesterol (TC) - mg/dL
              </label>
              <input
                type="number"
                name="tc"
                value={formData.tc}
                onChange={handleChange}
                min="0"
                step="0.1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.tc ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 200"
              />
              {errors.tc && <p className="text-red-500 text-sm mt-1">{errors.tc}</p>}
              <p className="text-xs text-gray-500 mt-1">Normal range: Less than 200 mg/dL</p>
            </div>

            {/* HDL Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                HDL Cholesterol - mg/dL
              </label>
              <input
                type="number"
                name="hdl"
                value={formData.hdl}
                onChange={handleChange}
                min="0"
                step="0.1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.hdl ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 50"
              />
              {errors.hdl && <p className="text-red-500 text-sm mt-1">{errors.hdl}</p>}
              <p className="text-xs text-gray-500 mt-1">Good: 40+ mg/dL (men), 50+ mg/dL (women)</p>
            </div>

            {/* Smoking Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Smoking Status
              </label>
              <select
                name="smoke"
                value={formData.smoke}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.smoke ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select smoking status</option>
                <option value="0">Non-smoker</option>
                <option value="1">Smoker</option>
              </select>
              {errors.smoke && <p className="text-red-500 text-sm mt-1">{errors.smoke}</p>}
            </div>

            {/* Blood Pressure Medication */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blood Pressure Medication
              </label>
              <select
                name="bpm"
                value={formData.bpm}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.bpm ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select medication status</option>
                <option value="0">Not taking medication</option>
                <option value="1">Taking medication</option>
              </select>
              {errors.bpm && <p className="text-red-500 text-sm mt-1">{errors.bpm}</p>}
            </div>

            {/* Diabetes Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Diabetes Status
              </label>
              <select
                name="diab"
                value={formData.diab}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.diab ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select diabetes status</option>
                <option value="0">No diabetes</option>
                <option value="1">Have diabetes</option>
              </select>
              {errors.diab && <p className="text-red-500 text-sm mt-1">{errors.diab}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={predict}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  'Predict Risk'
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Risk Result */}
          {risk !== null && (
            <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Risk Assessment Result
                </h3>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {risk}%
                </div>
                <p className="text-gray-600">
                  Cardiovascular Disease Risk
                </p>
                <div className="mt-4 text-sm text-gray-700">
                  <p className="font-semibold">Risk Level: </p>
                  <span className={`font-bold ${
                    risk < 20 ? 'text-green-600' : 
                    risk < 40 ? 'text-yellow-600' : 
                    risk < 70 ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {risk < 20 ? 'Low Risk' : 
                     risk < 40 ? 'Moderate Risk' : 
                     risk < 70 ? 'High Risk' : 'Very High Risk'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Predict