from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# allow cors for local frontend

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],  # ✅ Correct key name
    allow_headers=["*"],
)

# load model
model = tf.keras.models.load_model("model/model-192.keras")

# define input structure

class InputData(BaseModel):
    feature1:float
    feature2:float
    feature3:float
    feature4:float
    feature5:float
    feature6:float
    feature7:float

@app.post("/predict")
def predict(data: InputData):
    input_array = np.array([[data.feature1,data.feature2,data.feature3,data.feature4,data.feature5,data.feature6,data.feature7]])
    prediction = model.predict(input_array)
    risk_percent = np.clip(prediction[0][0],0.1) * 100
    return {"risk_precent"> round(risk_percent,2)}


# todo:test-------------------------------------------------------------

# from fastapi import FastAPI
# from pydantic import BaseModel
# import numpy as np
# import tensorflow as tf
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# # Allow CORS for your React frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # ✅ Fixed: Changed from 3000 to 5173
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load model
# model = tf.keras.models.load_model("model/model-192.keras")

# # Define input structure
# class InputData(BaseModel):
#     feature1: float
#     feature2: float
#     feature3: float
#     feature4: float
#     feature5: float
#     feature6: float
#     feature7: float

# @app.post("/predict")
# def predict(data: InputData):
#     # ✅ Fixed: Removed duplicate feature4, added feature5
#     input_array = np.array([[
#         data.feature1,
#         data.feature2, 
#         data.feature3,
#         data.feature4,
#         data.feature5,  # ✅ This was missing
#         data.feature6,
#         data.feature7
#     ]])
    
#     prediction = model.predict(input_array)
    
#     # ✅ Fixed: Corrected np.clip syntax and calculation
#     risk_percent = np.clip(prediction[0][0], 0, 1) * 100
    
#     # ✅ Fixed: Syntax error and typo
#     return {"risk_percent": round(risk_percent, 2)}