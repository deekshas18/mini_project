// import React from 'react'
// import '../Css/Register.css'
// import { Link } from 'react-router-dom';


// function Register() {


//   return (
//     <div className="login-container">
//       <h2>Register</h2>
//       <form>
//         <div className="form-group">
//           <label htmlFor="username">Username:</label>
//           <input type="text" id="username" name="username" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" name="password" required />
//         </div>
//         <Link to = "/Login">
//             <button type="submit">Sign Up</button>
//         </Link>
//         <div className='hyperlink'>Already Registered? <a href='/Login'>login</a></div>
        
//       </form>
//     </div>
//   )
// }

// export default Register

import React, { useState } from 'react';
import axiosInstance from '../Axios/axios';
import '../Css/Register.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Move useNavigate inside the component

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/user/register', {
        username,
        password
      });
      console.log(response.data);
      // Redirect to login page after successful registration
      navigate('/Login'); // Use navigate for redirection
    } catch (error) {
      console.error('There was an error registering the user!', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit">Sign Up</button>
        <div className='hyperlink'>Already Registered? <Link to='/Login'>Login</Link></div>
      </form>
    </div>
  );
}

export default Register;
