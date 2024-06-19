import React from 'react'
import '../Css/Register.css'
import { Link } from 'react-router-dom';


function Register() {
  return (
    <div className="login-container">
      <h2>Register</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <Link to = "/Login">
            <button type="submit">Sign Up</button>
        </Link>
        <div className='hyperlink'>Already Registered? <a href='/Login'>login</a></div>
        
      </form>
    </div>
  )
}

export default Register