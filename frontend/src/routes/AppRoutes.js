import React from 'react'
// import {Route,Routes} from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/Login'

function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
    </div>
  )
}

export default AppRoutes