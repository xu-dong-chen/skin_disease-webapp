import React, { useState } from "react";
import "./App.css";
import Chatbot from "./components/Chatbot"

function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPrediction("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    console.log(file);
    console.log(file.type); 
    console.log(file.name);
    console.log(file.size);

    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to fetch prediction");

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>🩺 Skin Disease Classifier</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Analyzing..." : "Upload & Predict"}
        </button>

        {prediction && (
          <div
            className={
              prediction.class === "Could not identify"
                ? "prediction unable"
                : "prediction"
            }
          >
            {prediction.class === "Could not identify" ? (
              <p>Could not identify</p>
            ) : (
              <p>✅ Predicted: {prediction.class}</p>
            )}

            <p>
              Confidence: {(prediction.confidence * 100).toFixed(1)}%
            </p>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>

      <Chatbot />
    </div>
  );
}

export default App;
