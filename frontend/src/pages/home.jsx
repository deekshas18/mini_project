import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../Css/Home.css";
import axios from "../Axios/axios";
import Loader from "../components/Loader";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'; // Correct import
// import { FFmpeg } from '@ffmpeg/ffmpeg';
// import {FFmpeg} from '@ffmpeg/ffmpeg';

function Home() {
  const mp3InputRef = useRef(null);
  const textInputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  // const ffmpeg = FFmpeg({ log: true });
  // const ffmpeg = createFFmpeg({ log: true });
  // const ffmpeg = FFmpeg.createFFmpeg({ log: true });


  const handleMp3Upload = () => {
    mp3InputRef.current.click();
  };

  const handleTextUpload = () => {
    textInputRef.current.click();
  };

  const handleMp3Change = async(event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file',file);
    setLoading(true);
    if (file) {
      console.log("Selected MP3 file:", file);
      // Handle the MP3 file upload logic here
      try{
        const response = await axios.post("/python-routes/convert-to-text", formData , {"content-type" : "multipart/form-data"},{responseType: 'blob'});
        console.log(response);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'processed_file.txt'); // Set the desired file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up
      }catch(err){
        alert("Error transcribing the file");
        console.log(err.message);
      }finally {
        setLoading(false); // Hide loader
      }
    }
  };

  const handleTextChange = async(event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected Text file:", file);
      // Handle the Text file upload logic here
      const formData = new FormData();
      formData.append('file',file);
      setLoading(true);
      try{
        const response = await axios.post('/python-routes/summarize-text', formData, {"content-type": "multipart/form-data"},{responseType:"blob"});
        console.log(response);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download','processed_file.txt');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }catch(err){
        alert("Error transcribing the file");
        console.log(err.message);
      }finally{
        setLoading(false);
      }

    }
  };

  // const handleStartDictating = async () => {
  //   if (isRecording) {
  //     mediaRecorder.stop();
  //   } else {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
  //     setAudioChunks([]);

  //     recorder.ondataavailable = (event) => {
  //       if (event.data.size > 0) {
  //         setAudioChunks((prev) => [...prev, event.data]);
  //       }
  //     };

  //     recorder.onstop = async () => {
  //       try {
  //         const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
  //         const url = URL.createObjectURL(audioBlob);
  //         setAudioUrl(url);
  //         await convertToMP3(audioBlob);
  //       } catch (err) {
  //         alert("Error uploading recording");
  //         console.log(err.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     recorder.start();
  //     setMediaRecorder(recorder);
  //   }
  //   setIsRecording(!isRecording);
  // };

  // const convertToMP3 = async (audioBlob) => {
  //   setLoading(true);
  //   try {
  //     await ffmpeg.load();
  //     const fetchFile = FFmpeg.fetchFile();
  //     ffmpeg.FS('writeFile', 'input.webm', await fetchFile(audioBlob));
  //     await ffmpeg.run('-i', 'input.webm', 'output.mp3');
  //     const data = ffmpeg.FS('readFile', 'output.mp3');
  //     const mp3Blob = new Blob([data.buffer], { type: 'audio/mp3' });
  //     const mp3Url = URL.createObjectURL(mp3Blob);

  //     const formData = new FormData();
  //     formData.append('file', mp3Blob, 'recording.mp3');
  //     console.log("MP3 Blob:", mp3Blob);

  //     setLoading(true);
  //     const response = await axios.post("/python-routes/convert-to-text", formData, { "content-type": "multipart/form-data" });
  //     const textUrl = window.URL.createObjectURL(new Blob([response.data]));
  //     const a = document.createElement("a");
  //     a.style.display = "none";
  //     a.href = textUrl;
  //     a.download = "processed_file.txt";
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(textUrl);
  //   } catch (err) {
  //     console.log(err);
  //     alert("Failed to convert to MP3");
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  const handleStartDictating = async () => {
    if (isRecording) {
      mediaRecorder.stop();
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      // Reset audio chunks **before each recording**
      await setAudioChunks([]);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.onstop = async() => {
        try{

          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
  
          const formData = new FormData();
          formData.append('file',audioBlob);
          console.log("Recorded Audio Blob:", audioBlob);

          setLoading(true);
          const response = await axios.post("/python-routes/convert-to-text", formData , {"content-type" : "multipart/form-data"});
          console.log(response);
          
          const downloadAudio = () => {
            const url = window.URL.createObjectURL(audioBlob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "recording.wav";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          };
  
          // Call download function only after recording stops
          downloadAudio();
        }catch(err){
          alert("error uploading recording");
          console.log(err.message);
        }finally{
          setLoading(false);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
    }
    setIsRecording(!isRecording);
  };

  return (
    <div>
      <div className="home-container">
        <div className="card">
          <h3>Transcribe Recordings</h3>
          <p>Upload the audio file here(mp3).</p>
          <button onClick={handleMp3Upload}>Start Upload</button>
          <input
            type="file"
            accept=".mp3"
            ref={mp3InputRef}
            style={{ display: "none" }}
            onChange={handleMp3Change}
          />
        </div>
        {loading && <Loader />}
        <div className="card">
          <h3>Transcribe Text File</h3>
          <p>Upload the text file here(pdf or txt).</p>
          <button onClick={handleTextUpload}>Start Transcribe</button>
          <input
            type="file"
            accept=".pdf,.txt"
            ref={textInputRef}
            style={{ display: "none" }}
            onChange={handleTextChange}
          />
        </div>
        {/* <div className="card">
          <h3>Dictate</h3>
          <p>Record now.</p>
          <button onClick={handleStartDictating}>
            {isRecording ? "Stop Recording" : "Start Dictating"}
          </button>
          {audioChunks.length > 0 && ( // Only display audio player if recording has happened
            <audio controls>
              <source
                src={URL.createObjectURL(
                  new Blob(audioChunks, { type: "audio/wav" })
                )}
              />
            </audio>
          )}
        </div> */}
      </div>
      
    </div>
  );
}

export default Home;
