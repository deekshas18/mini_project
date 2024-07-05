import React, { useState, useEffect } from 'react';
import axiosInstance from '../Axios/axios';
import '../Css/Edit.css'; // Import your CSS file for styling
import Header from '../components/header';
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
                // const response = await axiosInstance.get('/patient/getpatientnames');
                const response = await axiosInstance.get('/patient/getpatientid');
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
        const formData = new FormData();
        formData.append('file', file);


        try {
            // Upload file first
            const uploadResponse = await axiosInstance.put(`/patient/update/${selectedPatient}/${selectedDoctor}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus('File uploaded successfully!');
            // Now call the addPatient API to update doctor's patients array
            const addPatientResponse = await axiosInstance.put(`/doctor-routes/patientArray/${selectedPatient}/${selectedDoctor}`);
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
        <div className="container-edit">
            <Header/>
            <div className='container-main'>
                <h2 className="title">Upload Patient File</h2>
                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="form-group">
                        <label htmlFor="patient">Select Patient:</label>
                        <select
                            id="patient"
                            value={selectedPatient}
                            onChange={(e) => setSelectedPatient(e.target.value)}
                            required
                        >
                            <option value="">Select Patient</option>
                            {patients.map((patient) => (
                                //   <option key={patient._id} value={patient.email}>
                                //     {patient.name}
                                <option key={patient._id} value={patient.idey}>
                                    {patient.idey}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="doctor">Select Doctor:</label>
                        <select
                            id="doctor"
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
                    <div className="form-group">
                        <label htmlFor="file">Choose File:</label>
                        <input
                            type="file"
                            id="file"
                            accept=".txt"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <button type="submit" className="upload-btn">Upload</button>
                    {uploadStatus && <div className="upload-status">{uploadStatus}</div>}
                </form>
            </div>
        </div>
    );
};
export default Edit;