import { useState } from "react";
import { Heart, User, Calendar, Activity, Droplets, Cigarette, Pill, Stethoscope, AlertCircle, CheckCircle, Loader } from "lucide-react";

const Predict = () => {
  const [input, setInput] = useState({
    name: "",
    gender: "",
    age: "",
    tc: "",
    hdl: "",
    smoke: "",
    bpm: "",
    diabetes: "",
  });

  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateInputs = () => {
    const requiredFields = ['name', 'gender', 'age', 'tc', 'hdl', 'smoke', 'bpm', 'diabetes'];
    for (let field of requiredFields) {
      if (!input[field]) {
        setError(`Please fill in the ${field} field`);
        return false;
      }
    }
    
    // Validate numeric ranges
    if (parseInt(input.age) < 1 || parseInt(input.age) > 120) {
      setError("Age must be between 1 and 120");
      return false;
    }
    
    if (parseFloat(input.tc) < 0 || parseFloat(input.tc) > 1000) {
      setError("Total Cholesterol must be between 0 and 1000");
      return false;
    }
    
    if (parseFloat(input.hdl) < 0 || parseFloat(input.hdl) > 200) {
      setError("HDL Cholesterol must be between 0 and 200");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data.risk);
    } catch (err) {
      console.log(err);
      setError("Error connecting to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskLevel = (risk) => {
    if (risk < 10) return { level: "Low", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" };
    if (risk < 20) return { level: "Moderate", color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" };
    return { level: "High", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" };
  };

  const inputFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      icon: User,
      helper: "Your personal identifier for this assessment"
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        { value: "", label: "Select Gender" },
        { value: "1", label: "Male" },
        { value: "0", label: "Female" }
      ],
      icon: User,
      helper: "Biological sex affects heart disease risk patterns"
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter your age",
      icon: Calendar,
      helper: "Age is a significant factor in cardiovascular risk"
    },
    {
      name: "tc",
      label: "Total Cholesterol (mg/dL)",
      type: "number",
      placeholder: "e.g., 200",
      icon: Droplets,
      helper: "Normal range: Less than 200 mg/dL"
    },
    {
      name: "hdl",
      label: "HDL Cholesterol (mg/dL)",
      type: "number",
      placeholder: "e.g., 50",
      icon: Droplets,
      helper: "Good cholesterol - Higher is better (40+ for men, 50+ for women)"
    },
    {
      name: "smoke",
      label: "Smoking Status",
      type: "select",
      options: [
        { value: "", label: "Select Smoking Status" },
        { value: "1", label: "Yes, I smoke" },
        { value: "0", label: "No, I don't smoke" }
      ],
      icon: Cigarette,
      helper: "Smoking significantly increases heart disease risk"
    },
    {
      name: "bpm",
      label: "Blood Pressure Medication",
      type: "select",
      options: [
        { value: "", label: "Select Medication Status" },
        { value: "1", label: "Yes, I take BP medication" },
        { value: "0", label: "No, I don't take BP medication" }
      ],
      icon: Pill,
      helper: "Taking medication for high blood pressure"
    },
    {
      name: "diabetes",
      label: "Diabetes Status",
      type: "select",
      options: [
        { value: "", label: "Select Diabetes Status" },
        { value: "1", label: "Yes, I have diabetes" },
        { value: "0", label: "No, I don't have diabetes" }
      ],
      icon: Activity,
      helper: "Diabetes increases cardiovascular disease risk"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Heart Disease Risk Predictor</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get an assessment of your cardiovascular risk based on key health indicators. 
            This tool uses advanced machine learning to provide personalized insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Stethoscope className="w-6 h-6 mr-2 text-blue-600" />
                Health Assessment Form
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {inputFields.map((field) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={field.name} className={field.name === 'name' ? 'md:col-span-2' : ''}>
                      <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <IconComponent className="w-4 h-4 mr-2 text-gray-500" />
                        {field.label}
                      </label>
                      
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={input[field.name]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        >
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={input[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      )}
                      
                      <p className="text-xs text-gray-500 mt-1">{field.helper}</p>
                    </div>
                  );
                })}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    Assess Risk
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-green-600" />
                Risk Assessment
              </h2>

              {result ? (
                <div className="space-y-4">
                  <div className={`p-6 rounded-xl border-2 ${getRiskLevel(result).bgColor} ${getRiskLevel(result).borderColor}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Risk Score</span>
                      <CheckCircle className={`w-5 h-5 ${getRiskLevel(result).color}`} />
                    </div>
                    <div className={`text-3xl font-bold ${getRiskLevel(result).color} mb-2`}>
                      {result}%
                    </div>
                    <div className={`text-lg font-semibold ${getRiskLevel(result).color}`}>
                      {getRiskLevel(result).level} Risk
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">What this means:</h3>
                    <p className="text-sm text-gray-600">
                      {result < 10 && "Your risk appears to be relatively low. Continue maintaining healthy lifestyle habits."}
                      {result >= 10 && result < 20 && "You have moderate risk. Consider consulting with a healthcare provider about prevention strategies."}
                      {result >= 20 && "You have elevated risk. It's important to discuss these results with a healthcare professional promptly."}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-800">
                      <strong>Disclaimer:</strong> This is an AI-based assessment tool and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Complete the form to see your risk assessment</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-lg">
          <p className="text-gray-600 text-sm">
            This prediction model uses machine learning algorithms trained on cardiovascular health data. 
            Results are for informational purposes only and should be discussed with a qualified healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Predict;