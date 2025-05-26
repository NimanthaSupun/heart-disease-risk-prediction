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
    allow_method=["*"],
    allo_headers=["*"],
)

# load model
model = tf.keras.models.load_model("model/model-192.keras")