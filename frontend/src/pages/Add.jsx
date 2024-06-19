import React from 'react';
import '../Css/Add.css';

const Add = () => {
  return (
    <div className='main-cont'>
    <div className="container">
      <div className="card">
        <h5 className="card-title">Doctor Information</h5>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="doctorName">Name</label>
            <input type="text" id="doctorName" placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <input type="text" id="specialization" placeholder="Enter specialization" />
          </div>
          <button className="btn" id="addDoctorBtn" type='submit'>Add Doctor</button>
        </div>
      </div>
      
      <div className="card">
        <h5 className="card-title">Patient Information</h5>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="patientName">Patient Name</label>
            <input type="text" id="patientName" placeholder="Enter patient name" />
          </div>
          <div className="form-group">
            <label htmlFor="emailId">Email ID</label>
            <input type="email" id="emailId" placeholder="Enter email ID" />
          </div>
          <button className="btn" id="addPatientBtn" type='submit'>Add Patient</button>
        </div>
      </div>
    </div>
    <div className='search-main'>
      <select className="select-field" id="doctorSelect">
          <option value="">Select Doctor</option>
          {/* Add options dynamically */}
        </select>
        <select className="select-field" id="patientSelect">
          <option value="">Select Patient</option>
          {/* Add options dynamically */}
        </select>
    </div>
    <button className='search-btn'>Search</button>
    </div>
    
  );
}

export default Add;