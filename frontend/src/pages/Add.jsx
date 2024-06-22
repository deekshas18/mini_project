import {React,useState} from "react";
import "../Css/Add.css";
import axios from '../Axios/axios'
const Add = () => {
  const [docInfo, setDocInfo] = useState({
    dname:"",
    specialization:"",
    patients:[]
  });

  const handleChangeDoc = (e) => {
    const {id,value} = e.target;
    setDocInfo(prevInfo => ({
      ...prevInfo, [id] : value
    }));
  };


  const handleAddDoctor = async(e) => {
    e.preventDefault();
      const response = await axios.post('/doctor-routes/add-doctor', docInfo , {'content-type': 'multipart/form-data'});
      console.log(response)
      setDocInfo({
        dname:"",
        specialization:"",
        patients:[]
      })
      return alert("Doctor added successfully")
  }


  //handle patient details

  const[patientDetails,setPatientDetails] = useState({
    name:"",
    idey:"",
    Details:{}
  });

  const handleChangePatient = (e) => {
    const {id,value} = e.target;
    setPatientDetails(prevDetails => ({
      ...prevDetails, [id] : value
    }));
  }
  const handleAddPatient = async(e) => {
    e.preventDefault();
    const response = await axios.post('/patient/register' , patientDetails, {'content-type' : 'multipart/form-data'});
    console.log(response);
    setPatientDetails({
      name:"",
    idey:"",
    Details:{}
    })
    return alert("Patient added successfully")
  }
  return (
    <div className="main-cont">
      <div className="container">
        <div className="card">
          <h5 className="card-title">Doctor Information</h5>
          <form className="card-body" onSubmit={handleAddDoctor}>
            <div className="form-group">
              <label htmlFor="doctorName">Name</label>
              <input type="text" id="dname" value={docInfo.dname} placeholder="Enter name" onChange={handleChangeDoc}/>
            </div>
            <div className="form-group">
              <label htmlFor="specialization">Specialization</label>
              <input
                type="text"
                id="specialization"
                placeholder="Enter specialization"
                value={docInfo.specialization} 
                onChange={handleChangeDoc}
              />
            </div>
            <button className="btn" id="addDoctorBtn" type="submit">
              Add Doctor
            </button>
          </form>
        </div>

        <div className="card">
          <h5 className="card-title">Patient Information</h5>
          <form className="card-body" onSubmit={handleAddPatient}>
            <div className="form-group">
              <label htmlFor="patientName">Patient Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter patient name"
                value={patientDetails.name}
                onChange={handleChangePatient}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailId">Patient ID</label>
              <input type="text" id="idey" placeholder="Enter patient ID" value={patientDetails.idey} onChange={handleChangePatient}/>
            </div>
            <button className="btn" id="addPatientBtn" type="submit">
              Add Patient
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
