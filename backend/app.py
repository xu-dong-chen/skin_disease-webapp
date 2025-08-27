# backend/app.py

import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
from fastapi import FastAPI, File, UploadFile
import uvicorn
import timm


app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DiseaseClassifier(nn.Module):
  def __init__(self, num_classes):
    super(DiseaseClassifier,self).__init__()
    self.base_model = timm.create_model('efficientnet_b0', pretrained = True)
    self.features = nn.Sequential(*list(self.base_model.children())[:-1])

    enet_out_size = 1280
    self.classifier = nn.Linear(enet_out_size, num_classes)

  def forward(self, x):
    x = self.features(x)
    output = self.classifier(x)
    return output

num_classes = 5
model = DiseaseClassifier(num_classes)
model.load_state_dict(torch.load("skin_model_weights.pth", map_location="cpu"))
model.eval()

# Preprocessing (adjust to match your training setup)
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Change if needed
    transforms.ToTensor(),
])

# Class labels (update with your dataset's classes)
classes = ["Acne", "Actinic Keratosis", "Basal Cell Carcinoma","Eczema","Rosacea"]

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read image
    image = Image.open(file.file).convert("RGB")
    img_tensor = transform(image).unsqueeze(0)  # Add batch dimension

    # Run inference
    with torch.no_grad():
        outputs = model(img_tensor)
        _, predicted = torch.max(outputs, 1)
    
    return {"class": classes[predicted.item()]}

@app.get("/healthz")
def health():
    return {"status": "ok"}
