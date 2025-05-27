from flask import Flask,request,jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import joblib


model = tf.keras.models.load_model('model/model-199.keras')
scaler_data = joblib.load('model/scaler_data.sav')
scaler_target = joblib.load('model/scaler_target.sav')

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():

    result = request.json
    print(result)
    name = result['name']
    gender = float(result['gender'])
    age = float(result['age'])
    tc = float(result['tc'])
    hdl = float(result['hdl'])
    smoke = float(result['smoke'])
    bpm = float(result['bpm'])
    diab = float(result['diabetes'])

    test_data = np.array([gender,age,tc,hdl,smoke,bpm,diab]).reshape(1,-1)

    test_data = scaler_data.transform(test_data)

    prediction = model.predict(test_data)

    prediction = scaler_target.inverse_transform(prediction)

    print(prediction[0][0])

    return jsonify({
        'risk':round(float(prediction[0][0]),2)
    })

if __name__ == '__main__':
    app.run(debug=True,port=5000)