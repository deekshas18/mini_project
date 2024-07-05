// // // import React from "react";

// // // function Display() {
// // //   return (
// // //     <div>
// // //       <div className="search-main">
// // //         <select className="select-field" id="doctorSelect">
// // //           <option value="">Select Doctor</option>
// // //           {/* Add options dynamically */}
// // //         </select>
// // //         <select className="select-field" id="patientSelect">
// // //           <option value="">Select Patient</option>
// // //           {/* Add options dynamically */}
// // //         </select>
// // //       </div>
// // //       <button className="search-btn">Search</button>
// // //       <div></div>
// // //     </div>
// // //   );
// // // }

// // // export default Display;

// // //new
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import axiosInstance from '../Axios/axios';

// // const Display = () => {
// //   const [patients, setPatients] = useState([]);
// //   const [doctors, setDoctors] = useState([]);
// //   const [selectedPatient, setSelectedPatient] = useState('');
// //   const [selectedDoctor, setSelectedDoctor] = useState('');
// //   const [file, setFile] = useState(null);

// //   useEffect(() => {
// //     const fetchPatients = async () => {
// //       try {
// //         const response = await axiosInstance.get('/patient/getpatientnames');
// //         setPatients(response.data);
// //       } catch (error) {
// //         console.error('Error fetching patients', error);
// //       }
// //     };

// //     const fetchDoctors = async () => {
// //       try {
// //         const response = await axiosInstance.get('/doctor-routes/get-doctors');
// //         setDoctors(response.data.DoctorsList);
// //       } catch (error) {
// //         console.error('Error fetching doctors', error);
// //       }
// //     };

// //     fetchPatients();
// //     fetchDoctors();
// //   }, []);

// //   const handleFileChange = (e) => {
// //     setFile(e.target.files[0]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!selectedPatient || !selectedDoctor || !file) {
// //       alert('All fields are required!');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('file', file);

// //     try {
// //       const response = await axiosInstance.put(`/patient/update/${selectedPatient}/${selectedDoctor}`, formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });
// //       console.log(response.data);
// //       alert('File uploaded successfully!');
// //     } catch (error) {
// //       console.error('There was an error uploading the file!', error);
// //       alert('Error uploading file');
// //     }
// //   };

// //   return (
// //     <div>
// //       <form onSubmit={handleSubmit}>
// //         <div className='search-main'>
// //         <div>
// //           <select
// //             className="select-field" 
// //             id="patientSelect"
// //             value={selectedPatient}
// //             onChange={(e) => setSelectedPatient(e.target.value)}
// //             required
// //           >
// //             <option value="">Select Patient</option>
// //             {patients.map((patient) => (
// //               <option key={patient._id} value={patient.email}>
// //                 {patient.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         <div>
// //           <select
// //             className="select-field" 
// //             id="doctorSelect"
// //             value={selectedDoctor}
// //             onChange={(e) => setSelectedDoctor(e.target.value)}
// //             required
// //           >
// //             <option value="">Select Doctor</option>
// //             {doctors.map((doctor) => (
// //               <option key={doctor._id} value={doctor.dname}>
// //                 {doctor.dname}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         </div>
// //         <div>
// //         <button className="search-btn">Search</button>
// //         </div>
       
// //       </form>
// //     </div>
// //   );
// // };

// // export default Display;


// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../Axios/axios';

// const Display = () => {
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [patientFiles, setPatientFiles] = useState([]);
//   const [isSearchClicked, setIsSearchClicked] = useState(false);

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const response = await axiosInstance.get('/patient/getpatientnames');
//         setPatients(response.data);
//       } catch (error) {
//         console.error('Error fetching patients', error);
//       }
//     };

//     const fetchDoctors = async () => {
//       try {
//         const response = await axiosInstance.get('/doctor-routes/get-doctors');
//         setDoctors(response.data.DoctorsList);
//       } catch (error) {
//         console.error('Error fetching doctors', error);
//       }
//     };

//     fetchPatients();
//     fetchDoctors();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedPatient || !selectedDoctor) {
//       alert('All fields are required!');
//       return;
//     }

//     try {
//       const filesResponse = await axiosInstance.get(`/patient/find/${selectedPatient}`);
//       setPatientFiles(filesResponse.data || []);
//       setIsSearchClicked(true); // Show the content after successful search
//     } catch (error) {
//       console.error('There was an error fetching the files!', error);
//       alert('Error fetching files');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className='search-main'>
//           <div>
//             <select
//               className="select-field"
//               id="patientSelect"
//               value={selectedPatient}
//               onChange={(e) => setSelectedPatient(e.target.value)}
//               required
//             >
//               <option value="">Select Patient</option>
//               {patients.map((patient) => (
//                 <option key={patient._id} value={patient.idey}>
//                   {patient.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <select
//               className="select-field"
//               id="doctorSelect"
//               value={selectedDoctor}
//               onChange={(e) => setSelectedDoctor(e.target.value)}
//               required
//             >
//               <option value="">Select Doctor</option>
//               {doctors.map((doctor) => (
//                 <option key={doctor._id} value={doctor.dname}>
//                   {doctor.dname}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div>
//           <button type="submit" className="search-btn">Search</button>
//         </div>
//       </form>

//       {isSearchClicked && (
//         <div>
//           <h2>Patient Files</h2>
//           {patientFiles.length > 0 ? (
//             <ul>
//               {patientFiles.map((file, index) => (
//                 <li key={index}>{file}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>No files found for this patient.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Display;
////ananya

import React, { useState, useEffect } from 'react';
import axiosInstance from '../Axios/axios';
import '../Css/Display.css'
import Header from '../components/header';

const Display = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [patientFiles, setPatientFiles] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axiosInstance.get('/patient/getpatientnames');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !selectedDoctor) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await axiosInstance.get(`/patient/find/${selectedPatient}`);
      const patientData = response.data;

      // Extract files and dates from the patient data
      const files = [];
      Object.entries(patientData.Details).forEach(([doctor, fileArray]) => {
        fileArray.forEach((fileUrl) => {
          files.push({
            doctor,
            fileUrl,
            date: new Date().toLocaleDateString(), // Replace with actual date logic from your API response
          });
        });
      });

      // Filter files by selected doctor
      const filteredFiles = files.filter(file => file.doctor === selectedDoctor);

      setPatientFiles(filteredFiles);
      setIsSearchClicked(true); // Show the content after successful search
    } catch (error) {
      console.error('There was an error fetching the files!', error);
      alert('Error fetching files');
    }
  };

  const handleFileLinkClick = (url) => {
    // Open the URL in a new tab
    window.open(url, '_blank');
  };

  return (
    <div>
      <Header/>
      <form onSubmit={handleSubmit}>
        <div className='search-main'>
          <div className='search-main-sub'>
            <select
              className="select-field"
              id="patientSelect"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              required
            >
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient.idey}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <div className='search-main-sub'>
            <select
              className="select-field"
              id="doctorSelect"
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
          <div className='search-main-sub'>
            <button type="submit" className="search-btn">Search</button>
          </div>
        </div>
      </form>

      {isSearchClicked && (
        <div className='table-cont'>
          <h2>Patient Files for {selectedDoctor}</h2>
          {patientFiles.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Files</th>
                  <th>Date of Uploading</th>
                </tr>
              </thead>
              <tbody>
                {patientFiles.map((file, index) => (
                  <tr key={index}>
                    <td>{file.doctor}</td>
                    <td>
                      <button onClick={() => handleFileLinkClick(file.fileUrl)}>File {index + 1}</button>
                    </td>
                    <td>{file.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No files found for {selectedDoctor}.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Display;
