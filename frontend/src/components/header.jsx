import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/header.css'; // Link to your CSS file
import logo from '../Assets/logo.webp'
const Header = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="container-header">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="Medical Transcribing Logo" className="logo-img" /> {/* Link to your logo image */}
                        </Link>
                    </div>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        {/* <li><Link to="/services">Services</Link></li> */}
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
