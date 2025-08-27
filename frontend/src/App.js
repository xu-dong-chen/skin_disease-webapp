import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

  const response = await fetch("https://skin-disease-webapp-spas.onrender.com/predict", {
    method: "POST",
    body: formData,
  });

    const data = await response.json();
    setPrediction(data.class);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Skin Disease Classifier</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Predict</button>
      {prediction && <p>Predicted class: {prediction}</p>}
    </div>
  );
}

export default App;
