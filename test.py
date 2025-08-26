import requests

url = "http://127.0.0.1:8000/predict"
image_path = "eczem49.jpg"  # replace with your image file

with open(image_path, "rb") as f:
    files = {"file": f}
    response = requests.post(url, files=files)

print(response.json())
