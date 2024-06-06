import React, { useRef, useState } from 'react';
import '../Css/Home.css';

function Home() {
  const mp3InputRef = useRef(null);
  const textInputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const handleMp3Upload = () => {
    mp3InputRef.current.click();
  };

  const handleTextUpload = () => {
    textInputRef.current.click();
  };

  const handleMp3Change = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected MP3 file:', file);
      // Handle the MP3 file upload logic here
    }
  };

  const handleTextChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected Text file:', file);
      // Handle the Text file upload logic here
    }
  };

  const handleStartDictating = async () => {
    if (isRecording) {
      mediaRecorder.stop();
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      // Reset audio chunks **before each recording**
      setAudioChunks([]);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        console.log('Recorded Audio Blob:', audioBlob);

        const downloadAudio = () => {
          const url = window.URL.createObjectURL(audioBlob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'recording.wav';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        };

        // Call download function only after recording stops
        downloadAudio();
      };

      recorder.start();
      setMediaRecorder(recorder);
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="home-container">
      <div className="card">
        <h3>Transcribe Recordings</h3>
        <p>Upload the audio file here(mp3).</p>
        <button onClick={handleMp3Upload}>Start Upload</button>
        <input
          type="file"
          accept=".mp3"
          ref={mp3InputRef}
          style={{ display: 'none' }}
          onChange={handleMp3Change}
        />
      </div>
      <div className="card">
        <h3>Transcribe Text File</h3>
        <p>Upload the text file here(pdf or txt).</p>
        <button onClick={handleTextUpload}>Start Transcribe</button>
        <input
          type="file"
          accept=".pdf,.txt"
          ref={textInputRef}
          style={{ display: 'none' }}
          onChange={handleTextChange}
        />
      </div>
      <div className="card">
        <h3>Dictate</h3>
        <p>Record now.</p>
        <button onClick={handleStartDictating}>
          {isRecording ? 'Stop Recording' : 'Start Dictating'}
        </button>
        {audioChunks.length > 0 && ( // Only display audio player if recording has happened
          <audio controls>
            <source src={URL.createObjectURL(new Blob(audioChunks, { type: 'audio/wav' }))} />
          </audio>
        )}
      </div>
    </div>
  );
}

export default Home;
