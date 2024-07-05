import React from "react";
import { Link } from "react-router-dom";
import "../Css/Homemain.css";
import user from "../Assets/user.png";
import file from "../Assets/file.png";
import trans from "../Assets/transcription.png"
import edit from '../Assets/resume.png'
import doc from '../Assets/find.png'
import Header from "../components/header";

function Homemain() {
  return (
    <div>
      <Header/>
      <div className="home-heading">
            <h1>Welcome to Medical Transcribing Services</h1>
            <p>Your trusted partner in medical transcription.</p>
        </div>
      <div className="twobtn">
        <div className="card1">
          <img src={user} alt="User" />
          <Link to="/Add">
            <button className="addbtn">Add</button>
          </Link>
        </div>
        <div className="card1">
          <img src={file} alt="File" />
          <Link to="/Display">
            <button className="displaybtn">View patient</button>
          </Link>
        </div>
        <div className="card1">
          <img src={doc} alt="doc" className="doc-image"/>
          <Link to="/doctor">
            <button className="displaybtn">View doctor</button>
          </Link>
        </div>
        <div className="card1">
        <img src={trans} alt="Trans" />
          <Link to="/Home">
            <button className="transcribebtn">Transcribe</button>
          </Link>
        </div>
        <div className="card1">
        <img src={edit} alt="Edit" />
          <Link to="/Edit">
            <button className="editbtn">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homemain;
