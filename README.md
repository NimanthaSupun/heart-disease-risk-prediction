# Heart Disease Risk Prediction System 🫀

## 🌟 Project Overview

This project implements an end-to-end machine learning solution for predicting heart disease risk based on key health indicators. The system uses a deep neural network trained on cardiovascular health data to provide risk assessments, presented through an intuitive web application.

### Key Features

- **Deep Learning Model**: Custom neural network with 128-64-10-1 architecture
- **Data Preprocessing**: MinMax scaling for optimal model performance  

## 🏗️ System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   React Frontend │────│   Flask Backend  │────│  TensorFlow Model   │
│   (User Interface)    │   (API Server)   │    │  (Risk Prediction)  │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
        │                        │                        │
        │                        │                        │
    Tailwind CSS            Flask-CORS              Keras/TensorFlow
    Lucide Icons            NumPy/Joblib            Scikit-learn
```

## 🔬 Machine Learning Pipeline

### Dataset
- **Source**: Cardiovascular disease dataset with 6,644 patient records
- **Features**: 7 input variables (gender, age, cholesterol levels, lifestyle factors)
- **Target**: Heart disease risk percentage

## 🚀 Getting Started

### Backend Setup
1. **Clone the repository**
```bash
git clone https://github.com/NimanthaSupun/heart-disease-prediction.git
cd heart-disease-prediction
```

2. **Install Python dependencies**
```bash
pip install flask flask-cors tensorflow numpy scikit-learn joblib pandas matplotlib
```

## 🔒 Important Disclaimers

⚠️ **Medical Disclaimer**: This application is for informational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.

## 🏷️ Technologies Used

### Backend
- ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
- ![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white)
- ![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)
- ![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat&logo=numpy&logoColor=white)
- ![Scikit-learn](https://img.shields.io/badge/Scikit--learn-F7931E?style=flat&logo=scikit-learn&logoColor=white)

### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

### Tools & Libraries
- ![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=flat&logo=jupyter&logoColor=white)
- ![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white)
- ![Matplotlib](https://img.shields.io/badge/Matplotlib-11557c?style=flat&logo=matplotlib&logoColor=white)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻
**Nimantha Supun**
- GitHub: [@NimanthaSupun](https://github.com/NimanthaSupun)

---
