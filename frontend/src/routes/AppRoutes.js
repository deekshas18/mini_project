import React from 'react'
// import {Route,Routes} from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home'
import Login from '../pages/login'
import Display from '../pages/Display';
import Add from '../pages/Add';
import Register from '../pages/Register';
import Homemain from '../pages/Homemain';
import Edit from '../pages/EditPat';
import Doctor from '../pages/Doctor';
import ContactUs from '../pages/ContactUs';
import About from '../pages/About';
// import Edit from '../pages/Edit';



function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/Login' element={<Login/>}/>
            <Route path="/" element={<Register/>}/>
            <Route path="/Homemain" element={<Homemain/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/AboutUs" element={<About/>}/>
            <Route path="/Add" element={<Add/>}/>
            <Route path='/Display' element={<Display/>}/>
            <Route path='/Edit' element={<Edit/>}/>
            <Route path='/doctor' element={<Doctor />}/>
            <Route path='/contact' element={<ContactUs />}/>
        </Routes>
    </div>
  )
}

export default AppRoutes