import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");
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

    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        "https://skin-disease-webapp-spas.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to fetch prediction");

      const data = await response.json();
      setPrediction(data.class);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-indigo-200 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🩺 Skin Disease Classifier
        </h1>

        <div className="flex flex-col items-center space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-indigo-100 file:text-indigo-700
                       hover:file:bg-indigo-200"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg
                       hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Upload & Predict"}
          </button>

          {prediction && (
            <p className="text-lg font-semibold text-green-600">
              ✅ Predicted class: {prediction}
            </p>
          )}

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
