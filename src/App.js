import React, { useState } from 'react';
import VideoCapture from './components/VideoCapture';
import GestureDisplay from './components/GestureDisplay';
import axios from 'axios';

function App() {
  const [gesture, setGesture] = useState(null);

  const handleCapture = async () => {
    const video = document.querySelector('video');
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');

    // Convert dataURL to a Blob.
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const formData = new FormData();
    formData.append('file', blob, 'frame.jpg');

    try {
      // Use an environment variable for your API URL.
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/predict',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setGesture(response.data.gesture);
    } catch (err) {
      console.error("Inference error:", err);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>SignSpeak - Real-Time Gesture Recognition</h1>
      <VideoCapture />
      <button
        onClick={handleCapture}
        style={{ padding: '1rem 2rem', marginTop: '1rem', fontSize: '1rem' }}
      >
        Capture Frame
      </button>
      <GestureDisplay gesture={gesture} />
    </div>
  );
}

export default App;
