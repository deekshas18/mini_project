import React, { useState } from 'react';
import '../Css/contactUs.css'; // Import your CSS file for styling
import Header from '../components/header';


const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        setFormStatus('Thank you for contacting us. We will get back to you soon.');
    };

    return (
        <>
        <Header />
        <div className="contact-us-container">
           
            <div className="contact-us-content">
                <h2>Contact Us</h2>
                <p>We'd love to hear from you! Whether you have questions about our services, need support, or want to provide feedback, our team is here to assist you. Please reach out using the contact information below or fill out our contact form.</p>

                <div className="contact-details">
                    <div>
                        <h3>Get in Touch</h3>
                        <p><strong>Phone:</strong> +1 (800) 123-4567</p>
                        <p><strong>Email:</strong> trio@gmail.com</p>
                        <p><strong>Address:</strong></p>
                        <p>MediTranscribe Inc.</p>
                        <p>1234 Healthcare Drive</p>
                        <p>Suite 567</p>
                        <p>Tumkur Karnataka</p>
                    </div>

                    <div>
                        <h3>Office Hours</h3>
                        <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM (PST)</p>
                        <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM (PST)</p>
                        <p><strong>Sunday:</strong> Closed</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="submit-button">Submit</button>
                    {formStatus && <div className="form-status">{formStatus}</div>}
                </form>
            </div>
        </div>
        </>
    );
};

export default ContactUs;
