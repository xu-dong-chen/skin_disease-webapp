# 🩺 Skin Disease Web App

A web application that combines **skin disease image classification** with an **AI-powered chatbot** to provide general information about common skin conditions.

The application allows users to upload an image of a skin condition and receive a predicted disease classification with a confidence score. Users can also ask the chatbot questions about skin diseases and receive information based on a knowledge base.

> ⚠️ **Important:** This application is for educational and informational purposes only. It is **not a medical diagnostic tool** and should not be used as a substitute for professional medical advice, diagnosis, or treatment.

---

## ✨ Features

### 🖼️ Skin Disease Classifier

Users can upload an image of a skin condition and the application will:

1. Process the uploaded image.
2. Run it through a trained EfficientNet-B0 model.
3. Predict one of the supported skin conditions.
4. Display the model's confidence.
5. Return **"Could not identify"** when the model's confidence is below the required threshold.

The current supported classifications are:

* Acne
* Actinic Keratosis
* Basal Cell Carcinoma
* Eczema
* Rosacea

### 💬 AI Chatbot

The application also includes an AI chatbot that can answer questions about skin conditions.

The chatbot uses:

* **Qwen2.5-3B-Instruct** as the language model
* A local knowledge base containing information about the supported conditions
* **RapidFuzz** to identify the skin condition most relevant to the user's question
* Conversation history to provide context between messages

---

## 🏗️ Project Structure

skin_disease-webapp/
│
├── README.md
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── skin_model_weights.pth
│
├── chatbot_backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── chatbot/
│   │   ├── chat_service.py
│   │   ├── retriever.py
│   │   ├── prompt.py
│   │   └── llm.py
│   └── kb/
│       └── diseases_kb.json
│
└── frontend/
    ├── package.json
    ├── public/
    └── src/
        ├── App.js
        ├── App.css
        └── components/
            └── Chatbot.js

---

## 🛠️ Technologies Used

### Frontend

* React
* JavaScript
* HTML/CSS

### Skin Disease Classification Backend

* Python
* FastAPI
* PyTorch
* Torchvision
* TIMM
* Pillow
* EfficientNet-B0

### Chatbot Backend

* Python
* FastAPI
* Hugging Face Transformers
* Qwen2.5-3B-Instruct
* RapidFuzz
* PyTorch

---

# 🚀 Running the Project Locally

## 1. Frontend

Navigate to the frontend directory:

cd frontend

Install the dependencies:

npm install

Start the React development server:

npm start

The frontend should then be available at:

http://localhost:3000

---

## 2. Skin Disease Backend

Navigate to the backend:

cd backend

It is recommended to create a Python virtual environment:

python -m venv venv

Activate it on Windows:

venv\Scripts\activate

Install the dependencies:

pip install -r requirements.txt

Start the FastAPI server:

python -m uvicorn app:app --reload

The API should be available at:

http://127.0.0.1:8000

FastAPI documentation can be accessed at:

http://127.0.0.1:8000/docs

---

## 3. Chatbot Backend

Navigate to the chatbot backend:

cd chatbot_backend

Create and activate a virtual environment if you have not already done so:

python -m venv venv

On Windows:

venv\Scripts\activate

Install the dependencies:

pip install -r requirements.txt

Start the chatbot API:

python -m uvicorn app:app --reload

The chatbot API will normally run at:

http://127.0.0.1:8000

If the skin disease backend and chatbot backend are being run simultaneously, they should be configured to use **different ports**.

For example:

python -m uvicorn app:app --reload --port 8000

and:

python -m uvicorn app:app --reload --port 8001

The frontend fetch URLs should then point to the appropriate backend.

---

# 🤖 Qwen Chatbot Requirements

The chatbot uses the **Qwen2.5-3B-Instruct** language model.

The model is relatively large compared with a typical web application dependency. It may require a significant amount of:

* RAM
* Storage
* CPU/GPU resources
* Virtual memory

The chatbot may therefore **not run successfully on every computer**.

In particular, computers with limited RAM or storage may experience:

* Very slow model loading
* Out-of-memory errors
* High CPU usage
* Long response times
* Model loading failures
* The Python process terminating unexpectedly

The chatbot uses 4-bit quantisation to reduce the amount of memory required, but this does **not guarantee that it will run on every system**.

If the Qwen model cannot be loaded, the skin disease classifier can still operate independently as long as its own backend dependencies and model are available.

---

# ⚠️ Accuracy and Limitations

## Skin Disease Classifier

The predictions made by the skin disease classifier are **not guaranteed to be accurate**.

Machine-learning predictions can be affected by factors including:

* Image quality
* Lighting
* Image angle
* Backgrounds
* Skin tone
* Size and visibility of the affected area
* Differences between training images and real-world images
* Conditions that look visually similar
* Limitations of the training dataset
* Limitations of the trained model

The confidence score represents the model's confidence in its prediction. It **does not represent the probability that the prediction is medically correct**.

A high confidence score does not guarantee a correct diagnosis.

The application also uses a confidence threshold. If the model's confidence is below the threshold, the application returns:

Could not identify

This is intended to reduce low-confidence classifications, but it does not eliminate incorrect predictions.

---

## 💬 AI Chatbot

The chatbot can also produce incorrect or incomplete information.

AI-generated responses may contain:

* Incorrect information
* Outdated information
* Misinterpretations of questions
* Overly general information
* Inappropriate assumptions

The chatbot should therefore **not be relied upon for medical diagnosis or treatment decisions**.

If you are concerned about a skin condition, particularly if it is changing, painful, bleeding, persistent, or otherwise concerning, seek advice from a qualified healthcare professional.

---

# 🔒 Privacy

Images uploaded to the application are processed by the application's backend for prediction.

Do not upload images or provide information that you are not comfortable sending to the application's backend.

The application should not be considered a medical-record system.

---

# 🌐 Deployment

The backend APIs can be deployed separately from the React frontend.

For example:

Frontend
   │
   ├── POST /predict ──> Skin Disease Backend
   │
   └── POST /chat ─────> Chatbot Backend

When deploying the frontend, the local development URLs such as:

http://127.0.0.1:8000

must be replaced with the appropriate deployed backend URLs.

---

# 📚 Knowledge Base

The chatbot uses a JSON knowledge base located at:

chatbot_backend/kb/diseases_kb.json

The knowledge base contains information such as:

* Description
* Symptoms
* Causes
* Treatments
* When to seek medical help

The knowledge base is used to provide additional context to the language model when answering questions.

---

# 🧪 Development

The project is intended as an educational project demonstrating how a web application can combine:

* Machine learning image classification
* REST APIs
* Retrieval-based information
* Large language models
* React
* FastAPI
* Model deployment

---

# ⚠️ Medical Disclaimer

**This application is not a medical device and does not provide medical diagnoses.**

Predictions and chatbot responses are provided for educational and informational purposes only. They should not be used to make decisions about diagnosis, treatment, medication, or other medical care.

Always consult a qualified healthcare professional for medical advice and diagnosis.

If you believe you may have a serious or urgent medical condition, seek appropriate medical attention.

---

## 📄 License

This project is intended for educational purposes.
