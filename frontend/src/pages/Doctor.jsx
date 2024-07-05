import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/doctor.css';
import axiosInstance from '../Axios/axios';
import Header from '../components/header';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get('/doctor-routes/get-doctors');
        setDoctors(response.data.DoctorsList); // Adjust according to your API response structure
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <>
    <Header />
    <div className="appp">
      <div className="sidebar-d">
        <DoctorList doctors={doctors} onSelectDoctor={handleSelectDoctor} />
      </div>
      <div className="content-d">
        {selectedDoctor ? (
          <DoctorDetail doctor={selectedDoctor} />
        ) : (
          <p>Select a doctor to see their details.</p>
        )}
      </div>
    </div>
    </>
  );
};

const DoctorList = ({ doctors, onSelectDoctor }) => {
  return (
    <div className="doctor-list-d">
      <h2>Doctors List</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id} onClick={() => onSelectDoctor(doctor)}>
            {doctor.dname}
          </li>
        ))}
      </ul>
    </div>
  );
};

const DoctorDetail = ({ doctor }) => {
  return (
    <div className="doctor-detail-d">
      <h2>{doctor.dname}</h2>
      <p>Specialty: {doctor.specialization}</p>
      <p>Patients:</p>
      <ul>
        {doctor.patients.map((patient, index) => (
          <li key={index}>{patient}</li>
        ))}
      </ul>
    </div>
    
  );
  
};

export default Doctor;
