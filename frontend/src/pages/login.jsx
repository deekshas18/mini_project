import React from 'react';
import '../Css/Login.css'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <Link to = "/home">
            <button type="submit">Sign In</button>
        </Link>
        
      </form>
    </div>
  );
}

export default Login;
