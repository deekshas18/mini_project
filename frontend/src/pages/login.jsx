// import React, { useState } from 'react';
// import axiosInstance from '../Axios/axios';
// import axios from 'axios'
// import '../Css/Login.css'
// import { Link, useNavigate } from 'react-router-dom';


// function Login() {

//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()


//   const handleSubmit = async(e) =>{
//     e.preventDefault();
//     try{
//       const response = await axiosInstance.post('/user/login',{
//         username,
//         password
//       })
//       console.log(response.data);
//       // Redirect to login page after successful registration
//       navigate('/Home');

//     }catch (error) {
//       console.error('There was an error logging in the user!', error);
//     }
//   }


//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="username">Username:</label>
//           <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
//         </div>
//         <Link to = "/home">
//             <button type="submit">Sign In</button>
//         </Link>
        
//       </form>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import axiosInstance from '../Axios/axios';
import '../Css/Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Using useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/user/login', {
        username,
        password
      });
      console.log(response.data);
      // Redirect to home page after successful login
      navigate('/Home'); // Using navigate for navigation

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with an error:', error.response.data);
        setError('Invalid credentials. Please check your username and password.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request made but no response received:', error.request);
        setError('Could not connect to the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
        <button type="submit">Sign In</button>
        {error && <div className="error-message">{error}</div>}
        <div className="hyperlink">
          Not Registered? <Link to="/Register">Register here</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
