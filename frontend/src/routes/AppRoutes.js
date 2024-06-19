import React from 'react'
// import {Route,Routes} from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/Login'
import Display from '../pages/Display';
import Add from '../pages/Add';
import Register from '../pages/Register';


function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/Login' element={<Login/>}/>
            <Route path="/" element={<Register/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/Add" element={<Add/>}/>
            <Route path='/Display' element={<Display/>}/>
        </Routes>
    </div>
  )
}

export default AppRoutes