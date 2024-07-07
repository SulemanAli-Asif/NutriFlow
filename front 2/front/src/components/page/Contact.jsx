import React from 'react'
import Navbar from '../Shared/Navbar'
import Footer from '../Shared/Footer'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Importing icons

import "./UserInterface.css"
function Contact() {
  return (
    <>
    <Navbar />
    <div className='contact-main'>
        <div className="contact-container">
            <div className="contact-cards">
                <div className="contact-card">
                    <FaMapMarkerAlt className='contact-icon'/>
                    <h3>Address</h3>
                    <p>1234 Street Name, City Name, United States</p>
                </div>
                <div className="contact-card">
                    <FaEnvelope className='contact-icon' />
                    <h3>Email</h3>
                    <p>info@nutri-flow.com</p>
                </div>
                <div className="contact-card">
                    <FaPhoneAlt className='contact-icon' />
                    <h3>Phone Number</h3>
                    <p>+1-321-123456789</p>
                </div>
            </div>
        </div>

    </div>
    <Footer />
    </>
  )
}

export default Contact