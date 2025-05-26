from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow import keras
import os
import glob

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Global variable to store the model
model = None

def load_latest_model():
    """Load the most recent model file"""
    global model
    try:
        # Find all model files in the model directory
        model_files = glob.glob('model/model-*.keras')
        if not model_files:
            raise FileNotFoundError("No model files found in model directory")
        
        # Get the latest model file (highest epoch number)
        latest_model = max(model_files, key=lambda x: int(x.split('-')[1].split('.')[0]))
        
        # Load the model
        model = keras.models.load_model(latest_model)
        print(f"Model loaded successfully from: {latest_model}")
        return True
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return False

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "model_loaded": model is not None})

@app.route('/predict', methods=['POST'])
def predict_heart_risk():
    """Predict heart disease risk"""
    try:
        # Check if model is loaded
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        # Get data from request
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['sex', 'age', 'systolic_bp', 'diastolic_bp', 
                          'cholesterol', 'smoke', 'diabetes']
        
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Extract features in the correct order based on your dataset
        # SEX, AGE, SYSBP, DIABP, TOTCHOL, SMOKE, DIABETES
        features = [
            int(data['sex']),           # 0 for female, 1 for male
            int(data['age']),           # Age in years
            int(data['systolic_bp']),   # Systolic blood pressure
            int(data['diastolic_bp']),  # Diastolic blood pressure
            int(data['cholesterol']),   # Total cholesterol
            int(data['smoke']),         # 0 for non-smoker, 1 for smoker
            int(data['diabetes'])       # 0 for no diabetes, 1 for diabetes
        ]
        
        # Convert to numpy array and reshape for prediction
        input_array = np.array([features])
        
        # Make prediction
        prediction = model.predict(input_array)
        
        # Convert to risk percentage (assuming output is between 0 and 1)
        risk_percent = float(np.clip(prediction[0][0], 0, 1) * 100)
        
        # Determine risk category
        if risk_percent < 20:
            risk_category = "Low"
        elif risk_percent < 40:
            risk_category = "Moderate"
        elif risk_percent < 60:
            risk_category = "High"
        else:
            risk_category = "Very High"
        
        return jsonify({
            "risk_percentage": round(risk_percent, 2),
            "risk_category": risk_category,
            "input_features": {
                "sex": "Male" if data['sex'] == 1 else "Female",
                "age": data['age'],
                "systolic_bp": data['systolic_bp'],
                "diastolic_bp": data['diastolic_bp'],
                "cholesterol": data['cholesterol'],
                "smoke": "Yes" if data['smoke'] == 1 else "No",
                "diabetes": "Yes" if data['diabetes'] == 1 else "No"
            }
        })
        
    except ValueError as e:
        return jsonify({"error": f"Invalid input data: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

if __name__ == '__main__':
    # Load the model when starting the server
    if load_latest_model():
        print("Starting Flask server...")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("Failed to load model. Please check your model files.")