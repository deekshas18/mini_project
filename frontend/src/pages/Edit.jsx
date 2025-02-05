import React, { useState, useEffect } from 'react';
import axiosInstance from '../Axios/axios';
import '../Css/Edit.css'; // Import your CSS file for styling

const Edit = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axiosInstance.get('/patient/getpatientid');
        console.log(response.data);
        console.log("hey")
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients', error);
      }
    }; 

    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get('/doctor-routes/get-doctors');
        setDoctors(response.data.DoctorsList);
      } catch (error) {
        console.error('Error fetching doctors', error);
      }
    };

    fetchPatients();
    fetchDoctors();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !selectedDoctor || !file) {
      alert('All fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    try {
      const uploadResponse = await axiosInstance.put(`/patient/update/${selectedPatient}/${selectedDoctor}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(uploadResponse.data);
      setUploadStatus('File uploaded successfully!');

      const addPatientResponse = await axiosInstance.put(`/doctor-routes/patientArray/${selectedPatient}/${selectedDoctor}`);
      console.log(addPatientResponse.data);

      setTimeout(() => {
        setUploadStatus('');
        setSelectedPatient('');
        setSelectedDoctor('');
        setFile(null);
      }, 3000); // Clear success message after 3 seconds

    } catch (error) {
      console.error('There was an error uploading the file!', error);
      setUploadStatus('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Upload Patient File</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="edit-form-group">
          <label htmlFor="patient" className="edit-label">Select Patient:</label>
          <select
            id="patient"
            className="edit-select"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            required
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              // <option key={patient._id} value={patient.email}>
              //   {patient.name}
              <option key={patient._id} value={patient.idey}>
                {/* {patient.names} */}
              </option>
            ))}
          </select>
        </div>
        <div className="edit-form-group">
          <label htmlFor="doctor" className="edit-label">Select Doctor:</label>
          <select
            id="doctor"
            className="edit-select"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor.dname}>
                {doctor.dname}
              </option>
            ))}
          </select>
        </div>
        <div className="edit-form-group">
          <label htmlFor="file" className="edit-label">Choose File:</label>
          <input
            type="file"
            id="file"
            className="edit-input-file"
            accept=".txt"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="edit-upload-btn">Upload</button>
        {uploadStatus && <div className="edit-upload-status">{uploadStatus}</div>}
      </form>
    </div>
  );
};

export default Edit;
